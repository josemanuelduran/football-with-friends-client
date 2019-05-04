import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import * as moment from 'moment';

import { PaymentsFilter } from '../../models';

@Component({
    selector: 'fwf-payments-filter',
    templateUrl: 'payments-filter.component.html'
})
export class PaymentsFilterComponent implements OnInit {

    selectedFilters: PaymentsFilter = {};
    years: number[] = [];

    constructor(
        private viewCtrl: ViewController,
    ) {}

    ngOnInit() {
        this.setDefaultFilters();
    }

    private setDefaultFilters() {
        this.selectedFilters.showPaidPayments = false;
        this.selectedFilters.showNoPaidPayments = true;
        const date = moment();

        if (date.month() === 11) {
            this.years.push(date.year() + 1);
        }
        for (let year = date.year(); year >= 2019; year--) {
            this.years.push(year);
        }
    }

    applyFilter() {
        this.viewCtrl.dismiss(this.selectedFilters);
    }

    clearAll() {
        this.setDefaultFilters();
        this.viewCtrl.dismiss(this.selectedFilters);
    }
}
