import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Refresher, AlertController, ItemSliding } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Player, Payment, PaymentsFilter, Month } from '../../../models';
import { PaymentsService, MessagesService } from '../../../providers';
import { PaymentsFilterComponent } from '../../payments-filter/payments-filter.component';

@Component({
  selector: 'fwf-payment-management-player',
  templateUrl: './payment-management-player.component.html'
})
export class PaymentManagementPlayerComponent implements OnInit {

    payments: Payment[] = [];
    player: Player;
    filterIconClass: string;
    selectedFilters: PaymentsFilter = {};

    constructor(
        private navParams: NavParams,
        private paymentService: PaymentsService,
        private translate: TranslateService,
        private popoverCtrl: PopoverController,
        private messages: MessagesService,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.player = this.navParams.get('player');
        this.selectedFilters.showPaidPayments = false;
        this.selectedFilters.showNoPaidPayments = true;
        this.filterIconClass = this.getFilterIconClass();
    }

    ionViewWillEnter() {
        // It's necessary when comes here from back button'
        this.loadListPayments();
    }

    loadListPayments(refresher?: Refresher): void {
        this.paymentService
            .fetchPayments(this.player.id, this.selectedFilters)
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
                    this.initializeList(payments);
                },
                err => {
                    this.endAnimations(refresher);
                    this.messages.showError(err);
                },
                () => this.endAnimations(refresher)
            );
    }

    openFilter(clickEvent): void {
        let popover = this.popoverCtrl.create(
            PaymentsFilterComponent,
            { cssClass: 'popover__filter' }
        );
        popover.onDidDismiss(selectedFilters => {
            if (selectedFilters) {
                this.selectedFilters = selectedFilters;
                this.loadListPayments();
                this.filterIconClass = this.getFilterIconClass();
            }
        });
        popover.present({
            ev: clickEvent
        });
    }

    createPayment(): void {
        let monthNewPayment: Month = Month.getMonth(moment().month());
        let year = moment().year();
        if (this.payments && this.payments.length) {
            let monthLastPayment = this.payments[0].month;
            if (monthLastPayment === Month.DECEMBER) {
                monthNewPayment = Month.JANUARY;
                year++;
            } else {
                monthNewPayment = Month.getMonth(Month.getIndex(monthLastPayment) + 1);
            }
        }
        const payment: Payment = {
            playerId: this.player.id,
            year: year,
            paid: false,
            amount: 15,
            month: monthNewPayment
        };
        this.paymentService.createPayment(payment)
            .subscribe(
                data => this.loadListPayments(),
                error => this.messages.showError(error)
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

    undoPaid(payment: Payment, slidingItem: ItemSliding): void {
        payment.paid = false;
        delete payment.paymentDate;
        this.paymentService.updatePayment(payment)
            .subscribe(
                data =>  this.loadListPayments(),
                error => this.messages.showError(error)
            );
        slidingItem.close();
    }

    totalSwipeAction(payment: Payment, slidingItem: ItemSliding): void {
        if (payment.paid) {
            this.undoPaid(payment, slidingItem);
        } else {
            this.paid(payment, slidingItem);
        }
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

    private endAnimations(refresher: Refresher) {
        if (refresher) {
            refresher.complete();
        }
    }

    private initializeList(data: Payment[]) {
        this.payments = _.orderBy(data, ['year', 'monthIndex', 'matchDate'], ['desc', 'desc', 'desc']);
    }

    private getFilterIconClass(): string {
        let classIcon: string;
        if (!this.selectedFilters.showNoPaidPayments || !this.selectedFilters.showPaidPayments || this.selectedFilters.year) {
            classIcon = 'filter__in-use';
        }
        return classIcon;
    }
}
