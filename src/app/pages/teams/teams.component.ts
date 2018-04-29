import { Component, OnInit } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
} from 'ionic-angular';

import { Match } from '../../models';

@IonicPage({
    name: 'TeamsPage'
})
@Component({
  selector: 'fwf-page-teams',
  templateUrl: 'teams.component.html',
})
export class TeamsPageComponent implements OnInit {

    match: Match;

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
    }

    showOptions(): void {
    }
}
