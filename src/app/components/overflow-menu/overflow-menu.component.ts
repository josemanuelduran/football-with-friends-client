import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Option } from '../../models';

@Component({
    selector: 'fwf-overflow-menu',
    templateUrl: 'overflow-menu.component.html'
})

export class OverflowMenuComponent implements OnInit {
    options: Option[];

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams
    ) { }

    ngOnInit() {
        this.options = this.navParams.get('options');
    }

    optionSelected(optionSelected: Option) {
        this.viewCtrl.dismiss(optionSelected);
    }
}
