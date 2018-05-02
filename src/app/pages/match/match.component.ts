import { Component, OnInit } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    PopoverController,
    ModalController,
    AlertController
} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Match, Role, User, Option, Action, Team, Player } from '../../models';
import {
    OverflowMenuComponent,
    AddMatchComponent,
    TeamsMakerComponent,
} from '../../components';
import { BasePageComponent } from '../base/base-page.component';
import { MatchesService } from '../../providers';


const AVAILABLE_OPTIONS: Option[] = [
    {
        action: Action.EDIT_TEAMS,
        roles: [Role.ADMIN, Role.COACH],
        token: 'MATCHPAGE.ACTION.EDIT_TEAMS',
        icon: 'build'
    },
    {
        action: Action.EDIT_MATCH,
        roles: [Role.ADMIN],
        token: 'MATCHPAGE.ACTION.EDIT_MATCH',
        icon: 'create'
    },
    {
        action: Action.DELETE_MATCH,
        roles: [Role.ADMIN],
        token: 'MATCHPAGE.ACTION.DELETE_MATCH',
        icon: 'trash'
    },
    {
        action: Action.SET_SCOREBOARD,
        roles: [Role.ADMIN],
        token: 'MATCHPAGE.ACTION.SCOREBOARD',
        icon: 'football'
    },
    {
        action: Action.JOIN_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCHPAGE.ACTION.JOIN_CALL_UP',
        icon: 'thumbs-up'
    },
    {
        action: Action.UNJOIN_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCHPAGE.ACTION.UNJOIN_CALL_UP',
        icon: 'thumbs-down'
    }
];

@IonicPage({
    name: 'MatchPage'
})
@Component({
  selector: 'fwf-page-match',
  templateUrl: 'match.component.html',
})
export class MatchPageComponent extends BasePageComponent implements OnInit {

    match: Match;
    user: User;
    player: Player;
    playerJoined: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController,
        protected alertCtrl: AlertController,
        protected translate: TranslateService,
        private matchesService: MatchesService,
    ) {
        super(translate, alertCtrl);
    }

    ngOnInit() {
        this.match = this.navParams.get('matchSelected');
        this.user = this.navParams.get('user');
        this.player = this.navParams.get('player');
        this.playerJoined = this.navParams.get('playerJoined');
    }

    showOptions(clickEvent: Event): void {
        let actionsPopover =
            this.popoverCtrl.create(OverflowMenuComponent, { options: this.getOptionsAllowed()});
        actionsPopover.onDidDismiss((data) => {
            if (data) {
                switch (data.action) {
                    case Action.EDIT_TEAMS:
                        this.editTeams();
                        break;
                    case Action.EDIT_MATCH:
                        this.editMatch();
                        break;
                    case Action.DELETE_MATCH:
                        this.deleteMatch();
                        break;
                    case Action.JOIN_CALL_UP:
                        this.joinCallUp();
                        break;
                    case Action.UNJOIN_CALL_UP:
                        this.unjoinCallUp();
                        break;
                    case Action.SET_SCOREBOARD:
                        this.setScoreBoard();
                        break;
                }
            }
        });
        actionsPopover.present({
            ev: clickEvent
        });
    }

    goToCallUp(): void {
        this.navCtrl.push('CallUpPage', {match: this.match});
    }

    goToTeams(): void {
        this.navCtrl.push('TeamsPage', {match: this.match});
    }

    private getOptionsAllowed(): Option[] {
        let result = AVAILABLE_OPTIONS
            .filter(
                action => {
                    let arrayResult = action.roles.filter(rol => this.user.roles.indexOf(rol) > -1);
                    return arrayResult.length > 0;
                }
            );
        let indexRemove = result.findIndex(option => option.action === (this.playerJoined ? Action.JOIN_CALL_UP : Action.UNJOIN_CALL_UP));
        result.splice(indexRemove, 1);
        return result;
    }

    private editTeams(): void {
        if (this.match.callUp.length < this.match.numPlayers) {
            this.showInfo('MATCHPAGE.CALL_UP_INCOMPLETED');
        } else {
            let dialog =
                this.modalCtrl.create(
                    TeamsMakerComponent,
                    {match: this.match, player: this.player},
                    {enableBackdropDismiss: false});
            dialog.onDidDismiss(
                ( result:
                    {
                        actionOk: boolean,
                        teams: Team[]
                    }
                ) => {
                    if (result.actionOk) {
                        this.matchesService.updateTeams(this.match.id, result.teams)
                            .subscribe(
                                data => {},
                                error => this.showError(error)
                            );
                    }
                });
            dialog.present();
        }
    }

    private deleteMatch(): void {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('MATCHESPAGE.DELETE_MATCH'),
          subTitle: this.translate.instant('MATCHESPAGE.DELETE_SURE'),
          buttons: [
              {
                  text: this.translate.instant('CANCEL_BUTTON'),
                  role: 'cancel',
              },
              {
                  text: 'OK',
                  role: 'ok',
                  handler: response => {
                      this.matchesService.deleteMatch(this.match.id)
                          .subscribe(
                              data => {
                                  this.showConfirmation();
                                  this.navCtrl.pop();
                              },
                              error => this.showError(error)
                          );
                  }
              },
          ]
        });
        alert.present();
    }

    private editMatch(): void {
        let dialog = this.modalCtrl.create(AddMatchComponent, {match: this.match}, {enableBackdropDismiss: false});
        dialog.onDidDismiss((actionOk: boolean) => {
            if (actionOk) {
                this.showConfirmation();
            }
        });
        dialog.present();
    }

    private joinCallUp(): void {
        if (this.match.callUp.length === this.match.numPlayers) {
            this.showError('MATCHPAGE.CALL_UP_COMPLETED');
        } else {
            this.matchesService.joinPlayerCallUp(this.match.id, this.player)
                .subscribe(
                    data => this.showConfirmation(),
                    error => this.showError(error)
                );
        }
    }

    private unjoinCallUp(): void {
        this.matchesService.unjoinPlayerCallUp(this.match.id, this.player.id)
            .subscribe(
                data => this.showConfirmation(),
                error => this.showError(error)
            );
    }

    private setScoreBoard(): void {

    }
}
