import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name: 'PaymentsPage',
    segment: 'payments'
})
@Component({
    selector: 'fwf-page-payments',
    templateUrl: 'payments.component.html'
})
export class PaymentsPageComponent implements OnInit {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) { }

    ngOnInit() {
    }

}
