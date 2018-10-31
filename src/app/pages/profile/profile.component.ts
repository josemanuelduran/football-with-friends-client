import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Player, User, Profile } from '../../models';
import { ContextService, MessagesService, ProfileService } from '../../providers';
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
        private translate: TranslateService,
        private context: ContextService,
        private modalCtrl: ModalController,
        private messages: MessagesService,
        private alertCtrl: AlertController,
        private profileService: ProfileService,
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

    changePassword(): void {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('PROFILE_PAGE.CHANGE_PASSWORD'),
            inputs: [
              {
                name: 'currentPassword',
                placeholder: this.translate.instant('PROFILE_PAGE.CURRENT_PASSWORD'),
                type: 'password'
              },
              {
                name: 'newPassword1',
                placeholder: this.translate.instant('PROFILE_PAGE.NEW_PASSWORD'),
                type: 'password'
              },
              {
                name: 'newPassword2',
                placeholder: this.translate.instant('PROFILE_PAGE.REPIT_PASSWORD'),
                type: 'password'
              }
            ],
            buttons: [
              {
                text: this.translate.instant('CANCEL_BUTTON'),
                role: 'cancel',
                handler: data => {
                }
              },
              {
                text: this.translate.instant('SAVE_BUTTON'),
                handler: data => {
                    if (data.newPassword1 === data.newPassword2) {
                        this.profileService.changePassword(
                                this.context.getUserLogged().id,
                                data.currentPassword,
                                data.newPassword1)
                            .subscribe(
                                res => this.messages.showSuccess('ACTION_OK', 'CONFIRMATION'),
                                error => this.messages.showError(error, 'PROFILE_PAGE.ERROR_CHANGE_PASSWORD')
                            );
                    } else {
                        this.messages.showError('PROFILE_PAGE.BAD_NEW_PASSWORD_EXPLANATION', 'PROFILE_PAGE.BAD_NEW_PASSWORD');
                    }
                }
              }
            ]
          });
          alert.present();
    }
}
