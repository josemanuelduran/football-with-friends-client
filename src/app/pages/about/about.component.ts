import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from '../../providers';

@IonicPage({
    name: 'AboutPage',
    segment: 'about'
})
@Component({
    selector: 'fwf-page-about',
    templateUrl: 'about.component.html',
})
export class AboutPageComponent implements OnInit {

    imageSource = 'assets/img/png/FWF-logo.PNG';

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            private global: GlobalService,
            private translate: TranslateService,
    ) { }

    ngOnInit() {
        this.imageSource = this.translate.instant('APPLICATION_DETAIL.IMAGE_SOURCE');
    }

    ionViewDidLoad() {
        this.global.enableSideMenu(true);
    }

}
