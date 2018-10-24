import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Profile } from '../../models';
import { ProfileService } from '../../providers';

@Component({
  selector: 'fwf-edit-profile',
  templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

    profileForm: FormGroup;
    profile: Profile;

    constructor(
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private navParams: NavParams,
        private profileService: ProfileService,
    ) { }

    ngOnInit() {
        this.profile = this.navParams.get('profile');
        if (this.profile) {
            this.profileForm = this.formBuilder.group({
                name: [this.profile.fullName, Validators.required],
                alias: [this.profile.alias, Validators.required],
                email: [this.profile.email, [Validators.required, Validators.email]],
                username: [this.profile.username, Validators.required],
                phone: [this.profile.phoneNumber, [Validators.minLength(9), Validators.maxLength(9)]]
            });
        }
    }

    saveProfile() {
        this.profile = {
            ...this.profile,
            fullName: this.profileForm.controls['name'].value,
            alias: this.profileForm.controls['alias'].value,
            email: this.profileForm.controls['email'].value,
            phoneNumber: this.profileForm.controls['phone'].value,
            username: this.profileForm.controls['username'].value,
            user: {
                ...this.profile.user,
                fullName: this.profileForm.controls['name'].value,
                username: this.profileForm.controls['username'].value
            },
            player: {
                ...this.profile.player,
                alias: this.profileForm.controls['alias'].value,
                email: this.profileForm.controls['email'].value,
                phoneNumber: this.profileForm.controls['phone'].value,
            }
        };
        this.profileService.updateProfile(this.profile)
            .subscribe(
                response => this.viewCtrl.dismiss(this.profile),
                error => this.showError(error)
            );
    }

    cancel(): void {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('EDIT_PROFILE_PAGE.CANCEL'),
            subTitle: this.translate.instant('EDIT_PROFILE_PAGE.SURE'),
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'ok',
                    handler: data => {
                        this.viewCtrl.dismiss();
                    }
                },
            ]
          });
          alert.present();
    }

    private showError(error: any) {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('EDIT_PROFILE_PAGE.ERROR'),
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
    }

}
