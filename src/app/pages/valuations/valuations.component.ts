import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Match } from '../../models';

@IonicPage({
    name: 'ValuationsPage'
})
@Component({
  selector: 'fwf-page-valuations',
  templateUrl: 'valuations.component.html',
})
export class ValuationsPageComponent implements OnInit {

    match: Match;

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
    }

}
