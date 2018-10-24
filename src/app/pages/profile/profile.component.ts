import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

// import { TranslateService } from '@ngx-translate/core';

import { Player, User, Profile } from '../../models';
import { ContextService, MessagesService } from '../../providers';
import { EditProfileComponent } from '../../components/edit-profile/edit-profile.component';

@IonicPage({
    name: 'ProfilePage',
    segment: 'profile'
})
@Component({
    selector: 'fwf-page-profile',
    templateUrl: 'profile.component.html',
})
export class ProfilePageComponent {

    profile: Profile;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        // private translate: TranslateService,
        private context: ContextService,
        private modalCtrl: ModalController,
        private messages: MessagesService,
    ) {
        this.loadProfile();
    }

    ionViewDidLoad() {
    }

    editProfile(): void {
        let dialog =
            this.modalCtrl.create(EditProfileComponent, {profile: this.profile}, {enableBackdropDismiss: false});
        dialog.onDidDismiss((newProfile: Profile) => {
            if (newProfile) {
                this.context.setPlayerLogged(newProfile.player);
                this.context.setUserLogged(newProfile.user);
                this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                this.loadProfile();
            }
        });
        dialog.present();
    }

    loadProfile(): void {
        const userLogged: User = this.context.getUserLogged();
        const playerLogged: Player = this.context.getPlayerLogged();
        this.profile = {
            player: playerLogged,
            user: userLogged,
            fullName: userLogged.fullName,
            alias: playerLogged.alias,
            email: playerLogged.email,
            phoneNumber: playerLogged.phoneNumber,
            fixed: playerLogged.fixed,
            username: userLogged.username
        };
    }
}
