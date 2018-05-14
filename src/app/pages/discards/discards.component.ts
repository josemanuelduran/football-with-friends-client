import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Match } from '../../models';

@IonicPage({
    name: 'DiscardsPage'
})
@Component({
  selector: 'fwf-page-discards',
  templateUrl: 'discards.component.html',
})
export class DiscardsPageComponent implements OnInit {

    match: Match;

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
    }

}
