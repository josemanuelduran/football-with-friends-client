import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, App  } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Authenticate, Role } from '../../models';
import { GlobalService, ContextService, PlayersService } from '../../providers';
import { LoginService } from './services/login.service';

@IonicPage({
    name: 'LoginPage',
    segment: 'login'
})
@Component({
  selector: 'fwf-page-login',
  templateUrl: 'login.component.html',
})
export class LoginPageComponent implements OnInit {

    constructor(
      private global: GlobalService,
      private loginService: LoginService,
      private translate: TranslateService,
      private app: App,
      private alertCtrl: AlertController,
      private context: ContextService,
      private playersService: PlayersService,
    ) { }

    ngOnInit() {
        this.global.enableSideMenu(false);
    }

    ionViewDidLoad() {}

    onSubmit($event: Authenticate): void {
        this.loginService.login($event.username, $event.password)
            .subscribe(
                user => {
                    user = {
                        ...user,
                        roles: user.roles.map(rol => (<any>Role)[rol])
                    };
                    this.context.setUserLogged(user);
                    if (user.playerId) {
                        this.playersService.getPlayer(user.playerId)
                            .subscribe(
                                player => {
                                    this.context.setPlayerLogged(player);
                                    this.app.getActiveNav().setRoot('TabsController');
                                },
                                error => this.showError()
                            );
                    }
                },
                err => this.showError()
            );
    }

    private showError() {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('LOGIN.ERROR_LOGIN_TITLE'),
          subTitle: this.translate.instant('LOGIN.ERROR_LOGIN_MSG'),
          buttons: ['OK']
        });
        alert.present();
    }
}
