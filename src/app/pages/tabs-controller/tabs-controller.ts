import { Component, OnInit, ViewChild } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { GlobalService } from '../../providers';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';

@IonicPage({
    name: 'TabsController',
    segment: 'tabController'
})
@Component({
  selector: 'fwf-tabs-controller',
  templateUrl: 'tabs-controller.html',
})
export class TabsControllerComponent implements OnInit {

    tab1Root = 'MatchesPage';
    tab2Root = 'ProfilePage';
    tab3Root = 'PaymentsPage';
    tab4Root = 'StatsPage';

    tab1Title: string;
    tab2Title: string;
    tab3Title: string;
    tab4Title: string;

    @ViewChild('tabs') tabs: Tabs;

    constructor(
        // public navCtrl: NavController,
        public navParams: NavParams,
        private global: GlobalService,
        private translate: TranslateService
    ) { }

    ionViewDidEnter() {
        this.tabs.select(this.navParams.get('indexSelected'), undefined, undefined);
        this.global.enableSideMenu(true);
    }

    ngOnInit() {
        this.translateTitles();
    }

    private translateTitles(): void {
        this.tab1Title = this.translate.instant('TABS.TAB1');
        this.tab2Title = this.translate.instant('TABS.TAB2');
        this.tab3Title = this.translate.instant('TABS.TAB3');
        this.tab4Title = this.translate.instant('TABS.TAB4');
    }

}
