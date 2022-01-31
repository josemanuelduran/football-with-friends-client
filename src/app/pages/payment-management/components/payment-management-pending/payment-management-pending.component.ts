import { Component, OnInit } from '@angular/core';
import { AlertController, ItemSliding } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { Month, Payment, Player } from '../../../../models';
import { PlayersService, MessagesService, PaymentsService } from '../../../../providers';

interface PlayerPendingPayment {
  player: Player;
  payment: Payment;
}

@Component({
  selector: 'fwf-payment-management-pending',
  templateUrl: './payment-management-pending.component.html'
})
export class PaymentManagementPendingComponent implements OnInit {

    fixedPlayersPayments: PlayerPendingPayment[];
    noFixedPlayersPayments: PlayerPendingPayment[];
    private playersList: Player[];

    constructor(
        private playersService: PlayersService,
        private paymentService: PaymentsService,
        private translate: TranslateService,
        private messages: MessagesService,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.loadListPlayers();
    }

    loadListPlayers(): void {
        this.playersService.fetchPlayers()
            .subscribe(
                players => {
                  this.playersList = players;
                  this.loadListPayments();
                },
                error => this.messages.showError(error)
            );
    }

    loadListPayments(): void {
      this.paymentService
          .fetchPendingPayments()
          .subscribe(
              data => {
                  let payments = data.map(payment => {
                      let matchDate = payment.matchDate;
                      let name = '';
                      let monthIndex = 0;
                      if (matchDate) {
                          name = matchDate.split('T')[0];
                      } else {
                          name = `${this.translate.instant('MONTHS.' + payment.month)} - ${payment.year}`;
                          monthIndex = Month.getIndex(payment.month);
                      }
                      return <Payment> {
                          ...payment,
                          name: name,
                          monthIndex: monthIndex
                      };
                  });
                  this.initializeList(_.orderBy(payments, ['year', 'monthIndex', 'matchDate'], ['desc', 'desc', 'desc']));
              },
              err => {
                  this.messages.showError(err);
              }
          );
  }

  paid(payment: Payment, slidingItem: ItemSliding): void {
    payment.paid = true;
    payment.paymentDate = new Date();
    this.paymentService.updatePayment(payment)
        .subscribe(
            data =>  this.loadListPayments(),
            error => this.messages.showError(error)
        );
    slidingItem.close();
  }

  deletePayment(payment: Payment, slidingItem: ItemSliding): void {
      let alert = this.alertCtrl.create({
      title: this.translate.instant('PAYMENT_MANAGEMENT_PAGE.DELETE_PAYMENT'),
      subTitle: this.translate.instant('PAYMENT_MANAGEMENT_PAGE.DELETE_SURE'),
      buttons: [
          {
              text: this.translate.instant('CANCEL_BUTTON'),
              role: 'cancel',
          },
          {
              text: 'OK',
              role: 'ok',
              handler: response => {
                  this.paymentService.deletePayment(payment.id)
                      .subscribe(
                          data => {
                              this.loadListPayments();
                              this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                          },
                          error => this.messages.showError(error)
                      );
              }
          },
      ]
      });
      alert.present();
      slidingItem.close();
  }

  private initializeList(payments: Payment[]) {
    const playersPendingPayments = payments.map(payment => {
        const player = this.playersList.find(el => el.id === payment.playerId);
        return {
            player: player,
            payment: payment,
        } as PlayerPendingPayment;
    })
    this.fixedPlayersPayments = playersPendingPayments.filter(el => el.player.fixed);
    this.noFixedPlayersPayments = playersPendingPayments.filter(el => !el.player.fixed);
  }
}
