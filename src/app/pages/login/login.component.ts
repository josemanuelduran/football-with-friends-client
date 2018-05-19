import { Component, OnInit } from '@angular/core';
import { IonicPage, App  } from 'ionic-angular';

import { Authenticate, Role } from '../../models';
import { GlobalService, ContextService, PlayersService, MessagesService } from '../../providers';
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
      private app: App,
      private context: ContextService,
      private playersService: PlayersService,
      private messages: MessagesService,
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
                                error => this.messages.showError('LOGIN.ERROR_LOGIN_MSG', 'LOGIN.ERROR_LOGIN_TITLE')
                            );
                    }
                },
                err => this.messages.showError('LOGIN.ERROR_LOGIN_MSG', 'LOGIN.ERROR_LOGIN_TITLE')
            );
    }
}
