import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name: 'ProfilePage',
    segment: 'profile'
})
@Component({
    selector: 'fwf-page-profile',
    templateUrl: 'profile.component.html',
})
export class ProfilePageComponent {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) { }

    ionViewDidLoad() {
    }

}
