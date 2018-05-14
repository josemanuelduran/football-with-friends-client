import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Match } from '../../models';

@IonicPage({
    name: 'CallUpPage'
})
@Component({
  selector: 'fwf-page-call-up',
  templateUrl: 'call-up.component.html',
})
export class CallUpPageComponent implements OnInit {

    match: Match;
    reserves: boolean;

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
        this.reserves = this.navParams.get('reserves');
    }

}
