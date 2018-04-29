import {
    AlertController
} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export class BasePageComponent {

    constructor(
        protected translate: TranslateService,
        protected alertCtrl: AlertController,
    ) { }

    protected showError(error: string) {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ERROR'),
          subTitle: this.translate.instant(error),
          buttons: ['OK']
        });
        alert.present();
    }

    protected showConfirmation() {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('CONFIRMATION'),
          subTitle: this.translate.instant('ACTION_OK'),
          buttons: ['OK']
        });
        alert.present();
    }

    protected showInfo(message: string) {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('INFORMATION'),
            subTitle: this.translate.instant(message),
            buttons: ['OK']
        });
        alert.present();
    }

}
