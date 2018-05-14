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
    },
    {
        action: Action.DISCARD_ME_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCHPAGE.ACTION.DISCARD_ME_CALL_UP',
        icon: 'remove-circle'
    },
    {
        action: Action.EXIT_FROM_DISCARDS,
        roles: [Role.PLAYER],
        token: 'MATCHPAGE.ACTION.EXIT_FROM_DISCARDS',
        icon: 'checkmark-circle'
    },
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
    discardedPlayer: boolean;

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
        this.setDiscardedPlayer();
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
                    case Action.DISCARD_ME_CALL_UP:
                        this.discardMeCallUp();
                        break;
                    case Action.EXIT_FROM_DISCARDS:
                        this.exitFromDiscards();
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

    goToDiscards(): void {
        this.navCtrl.push('DiscardsPage', {match: this.match});
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
                data => {
                    this.joinedPlayer = false;
                    this.showConfirmation();
                    this.reloadMatch();
                },
                error => this.showError(error)
            );
    }

    private discardMeCallUp(): void {
        let playerDiscard: PlayerDiscard = {
            player: {
                player: {
                    id: this.player.id,
                    fixed: this.player.fixed,
                    name: this.player.alias
                },
                dateCallUp: new Date()
            },
            canPlay: false
        };
        this.matchesService.discardPlayerCallUp(this.match.id, playerDiscard)
            .subscribe(
                data => {
                    this.discardedPlayer = true;
                    this.showConfirmation();
                    this.reloadMatch();
                },
                error => this.showError(error)
            );
    }

    private exitFromDiscards(): void {
        this.matchesService.exitFromDiscards(this.match.id, this.player.id)
            .subscribe(
                data => {
                    this.discardedPlayer = false;
                    this.showConfirmation();
                    this.reloadMatch();
                },
                error => this.showError(error)
            );
    }

    private setScoreBoard(): void {
        let actionsPopover =
            this.popoverCtrl.create(ScoreboardComponent,
                {
                    scoreWhite: this.match.team1.goals || 0,
                    scoreBlack: this.match.team2.goals || 0
                });
        actionsPopover.onDidDismiss((data) => {
            if (data && data.actionOk) {
                this.match.team1.goals = data.scoreWhite;
                this.match.team2.goals = data.scoreBlack;
                this.matchesService.updateMatch(this.match)
                    .subscribe(
                        ok => {
                            this.reloadMatch();
                            this.showConfirmation();
                        },
                        error => this.showError(error)
                    );
            }
        });
        actionsPopover.present();
    }

    private setJoinedPlayer(): void {
        let callUp = this.match.callUp;
        if (callUp) {
            this.joinedPlayer = callUp.findIndex(el => el.player.id === this.player.id) >= 0;
        } else {
            this.joinedPlayer = false;
        }
    }

    private setDiscardedPlayer(): void {
        let discards = this.match.discards;
        if (discards) {
            this.discardedPlayer = discards.findIndex(el => el.player.player.id === this.player.id) >= 0;
        } else {
            this.discardedPlayer = false;
        }
    }

    private editCallUp(): void {
        this.playerService.fetchPlayers()
            .subscribe(
                players => this.showListPlayers(players),
                error => this.showError(error)
            );
    }

    private addExtraPlayer(): void {
        let prompt = this.alertCtrl.create({
            title: this.translate.instant('MATCHPAGE.ACTION.ADD_EXTRA_PLAYER'),
            inputs: [
                {
                    name: 'name',
                    placeholder: this.translate.instant('MATCHPAGE.NAME')
                },
            ],
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON')
                },
                {
                    text: this.translate.instant('OK_BUTTON'),
                    handler: data => {
                        let extraPlayer: Player = {
                            id: `extraPlayer${this.getNumExtraPlayers() + 1}`,
                            alias: data.name,
                            fixed: false
                        };
                        this.matchesService.joinPlayerCallUp(this.match.id, extraPlayer)
                            .subscribe(
                                ok => {
                                    this.showConfirmation();
                                    this.reloadMatch();
                                },
                                error => this.showError(error)
                            );
                    }
                }
            ]
        });
        prompt.present();
    }

    private removeExtraPlayer(): void {
        let prompt = this.alertCtrl.create({
            title: this.translate.instant('MATCHPAGE.ACTION.ADD_EXTRA_PLAYER'),
            inputs: [
                {
                    name: 'name',
                    placeholder: this.translate.instant('MATCHPAGE.NAME')
                },
            ],
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON')
                },
                {
                    text: this.translate.instant('OK_BUTTON'),
                    handler: data => {
                        let extraPlayer =
                            this.match.callUp.find(el => el.player.id.startsWith('extraPlayer') && el.player.name === data.name);
                        this.matchesService.unjoinPlayerCallUp(this.match.id, extraPlayer.player.id)
                            .subscribe(
                                ok => {
                                    this.showConfirmation();
                                    this.reloadMatch();
                                },
                                error => this.showError(error)
                            );
                    }
                }
            ]
        });
        prompt.present();
    }

    private getNumExtraPlayers(): number {
        return this.match.callUp ?
            this.match.callUp.filter(el => el.player.id.startsWith('extraPlayer')).length
            : 0;
    }

    private showListPlayers(players: Player[]) {
        let alert = this.alertCtrl.create();
        alert.setTitle(this.translate.instant('MATCHPAGE.ADD_PLAYER'));
        players.forEach(player => {
            let checked = this.match.callUp && this.match.callUp.findIndex(el => el.player.id === player.id) >= 0;
            alert.addInput({
                type: 'checkbox',
                label: player.alias,
                value: player.id,
                checked: checked
            });
        });
        alert.addButton(this.translate.instant('CANCEL_BUTTON'));
        alert.addButton({
        text: this.translate.instant('OK_BUTTON'),
        handler: selecteds => {
            this.includePlayersCallUp(players, selecteds);
            this.excludePlayersCallUp(players, selecteds);
        }
        });
        alert.present();
    }

    private includePlayersCallUp(players: Player[], playersId: string[]): void {
        let playersSelected = players.filter(player => {
            let isPlayerSelected = playersId.findIndex(el => el === player.id) >= 0;
            let isPlayerCallUp = this.match.callUp && this.match.callUp.findIndex(el => el.player.id === player.id) >= 0;
            return !isPlayerCallUp && isPlayerSelected;
        });
        playersSelected.forEach((player, index) => {
            this.matchesService.joinPlayerCallUp(this.match.id, player)
                .subscribe(
                    data => {
                        if (index === playersSelected.length - 1) {
                            this.showConfirmation();
                            this.reloadMatch();
                        }
                    },
                    error => this.showError(error)
                );
        });
    }

    private excludePlayersCallUp(players: Player[], playersId: string[]): void {
        let playersNoSelected = players.filter(player => {
            let isPlayerNoSelected = playersId.findIndex(el => el === player.id) < 0;
            let isPlayerCallUp = this.match.callUp && this.match.callUp.findIndex(el => el.player.id === player.id) >= 0;
            return isPlayerCallUp && isPlayerNoSelected;
        });
        playersNoSelected.forEach((player, index) => {
            this.matchesService.unjoinPlayerCallUp(this.match.id, player.id)
                .subscribe(
                    data => {
                        if (index === playersNoSelected.length - 1) {
                            this.showConfirmation();
                            this.reloadMatch();
                        }
                    },
                    error => this.showError(error)
                );
        });
    }

    private reloadMatch() {
        this.matchesService.getMatch(this.match.id)
            .subscribe(
                match => this.match = match,
                error => this.showError(error)
            );
    }
}
