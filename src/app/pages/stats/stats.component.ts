import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalService } from '../../providers';

@IonicPage({
    name: 'StatsPage',
    segment: 'stats'
})
@Component({
    selector: 'fwf-page-stats',
    templateUrl: 'stats.component.html',
})
export class StatsPageComponent {

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            private global: GlobalService,
    ) { }

    ionViewDidLoad() {
        this.global.enableSideMenu(true);
    }

}
