import { Component, OnInit } from '@angular/core';
import {
    IonicPage,
    Refresher,
    PopoverController
} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { Payment, Player, PaymentsFilter, Month } from '../../models';
import { ContextService, MessagesService, PaymentsService } from '../../providers';
import { PaymentsFilterComponent } from '../../components/payments-filter/payments-filter.component';

@IonicPage({
    name: 'PaymentsPage',
    segment: 'payments'
})
@Component({
    selector: 'fwf-page-payments',
    templateUrl: 'payments.component.html'
})
export class PaymentsPageComponent implements OnInit {

    payments: Payment[] = [];
    playerLogged: Player;
    filterIconClass: string;
    selectedFilters: PaymentsFilter = {};

    constructor(
            private paymentService: PaymentsService,
            private translate: TranslateService,
            private popoverCtrl: PopoverController,
            private context: ContextService,
            private messages: MessagesService,
    ) {
        this.playerLogged = this.context.getPlayerLogged();
     }

    ionViewWillEnter() {
        // It's necessary when comes here from back button'
        this.loadListPayments();
    }

    ngOnInit() {
        this.selectedFilters.showPaidPayments = false;
        this.selectedFilters.showNoPaidPayments = true;

    }

    loadListPayments(refresher?: Refresher): void {
        this.paymentService
            .fetchPayments(this.playerLogged.id, this.selectedFilters)
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
                this.filterIconClass = this.getFilterIconClass(selectedFilters);
            }
        });
        popover.present({
            ev: clickEvent
        });
    }

    private endAnimations(refresher: Refresher) {
        if (refresher) {
            refresher.complete();
        }
    }

    private initializeList(data: Payment[]) {
        this.payments = _.orderBy(data, ['year', 'monthIndex', 'matchDate'], ['desc', 'desc', 'desc']);
    }

    private getFilterIconClass(selectedFilters: PaymentsFilter): string {
        let classIcon: string;
        if (!selectedFilters.showNoPaidPayments || !selectedFilters.showPaidPayments || selectedFilters.year) {
            classIcon = 'filter__in-use';
        }
        return classIcon;
    }
}
