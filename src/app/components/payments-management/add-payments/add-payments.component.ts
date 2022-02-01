import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { MessagesService, PaymentsService } from '../../../providers';
import { Month, Payment, Player } from '../../../models';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'fwf-add-payments',
  templateUrl: 'add-payments.component.html'
})
export class AddPaymentsComponent implements OnInit {

    paymentForm: FormGroup;
    fixedPlayerList: Player[];

    constructor(
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private paymentService: PaymentsService,
        private messages: MessagesService,
        private navParams: NavParams
    ) { }

    ngOnInit() {
        const fakePlayerAll: Player = {
            id: 'fakeIdAll',
            alias: this.translate.instant('ADD_PAYMENTS_PAGE.ALL'),
            fixed: true,
        };
        this.fixedPlayerList = [fakePlayerAll].concat(this.navParams.get('fixedPlayerList'));
        this.paymentForm = this.formBuilder.group({
            date: ['', Validators.required],
            player: [undefined, Validators.required],
        });
    }

    savePayments() {
        const selectedPlayer = this.paymentForm.controls['player'].value;
        const selectedDate = this.paymentForm.controls['date'].value as string;
        const year = +selectedDate.split('-')[0];
        const monthNumber = +selectedDate.split('-')[1] - 1;
        if (selectedPlayer !== 'fakeIdAll') {
          const payment: Payment = {
              playerId: selectedPlayer,
              year: year,
              paid: false,
              amount: 15,
              month: Month.getMonth(monthNumber)
          };
          this.paymentService.createPayment(payment)
              .subscribe(
                  data => this.viewCtrl.dismiss(true),
                  error => this.messages.showError(error, this.translate.instant('ADD_PAYMENTS_PAGE.ERROR'))
              );
        } else {
            forkJoin(
              this.fixedPlayerList.filter(player => player.id !== 'fakeIdAll').map(player => {
                  const payment: Payment = {
                      playerId: player.id,
                      year: year,
                      paid: false,
                      amount: 15,
                      month: Month.getMonth(monthNumber)
                  };
                  return this.paymentService.createPayment(payment);
              })
            ).subscribe(
                data => this.viewCtrl.dismiss(true),
                error => this.messages.showError(error, this.translate.instant('ADD_PAYMENTS_PAGE.ERROR'))
            );
        }
    }

    cancel(): void {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('ADD_PAYMENTS_PAGE.CANCEL'),
            subTitle: this.translate.instant('ADD_PAYMENTS_PAGE.SURE'),
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'ok',
                    handler: data => {
                        this.viewCtrl.dismiss(false);
                    }
                },
            ]
          });
          alert.present();
    }

}
