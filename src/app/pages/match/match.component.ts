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
import * as moment from 'moment';

import { Match, Role, User, Option, Action, Team, Player, PlayerDiscard } from '../../models';
import {
    OverflowMenuComponent,
    AddMatchComponent,
    TeamsMakerComponent,
} from '../../components';
import { MatchesService, PlayersService, ContextService, MessagesService } from '../../providers';
import { ScoreboardComponent } from '../../components/scoreboard/scoreboard.component';
import { isUndefined } from 'ionic-angular/util/util';

const AVAILABLE_OPTIONS: Option[] = [
    {
        action: Action.EDIT_TEAMS,
        roles: [Role.ADMIN, Role.COACH],
        token: 'MATCH_PAGE.ACTION.EDIT_TEAMS',
        icon: 'build'
    },
    {
        action: Action.EDIT_MATCH,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.EDIT_MATCH',
        icon: 'create'
    },
    {
        action: Action.DELETE_MATCH,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.DELETE_MATCH',
        icon: 'trash'
    },
    {
        action: Action.SET_SCOREBOARD,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.SCOREBOARD',
        icon: 'football'
    },
    {
        action: Action.JOIN_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCH_PAGE.ACTION.JOIN_CALL_UP',
        icon: 'thumbs-up'
    },
    {
        action: Action.UNJOIN_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCH_PAGE.ACTION.UNJOIN_CALL_UP',
        icon: 'thumbs-down'
    },
    {
        action: Action.DISCARD_ME_CALL_UP,
        roles: [Role.PLAYER],
        token: 'MATCH_PAGE.ACTION.DISCARD_ME_CALL_UP',
        icon: 'remove-circle'
    },
    {
        action: Action.EXIT_FROM_DISCARDS,
        roles: [Role.PLAYER],
        token: 'MATCH_PAGE.ACTION.EXIT_FROM_DISCARDS',
        icon: 'checkmark-circle'
    },
    {
        action: Action.EDIT_CALL_UP,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.EDIT_CALL_UP',
        icon: 'people'
    },
    {
        action: Action.EDIT_DISCARDS,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.EDIT_DISCARDS',
        icon: 'close-circle'
    },
    {
        action: Action.ADD_EXTRA_PLAYER,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.ADD_EXTRA_PLAYER',
        icon: 'add'
    },
    {
        action: Action.REMOVE_EXTRA_PLAYER,
        roles: [Role.ADMIN],
        token: 'MATCH_PAGE.ACTION.REMOVE_EXTRA_PLAYER',
        icon: 'remove'
    }

];

@IonicPage({
    name: 'MatchPage'
})
@Component({
  selector: 'fwf-page-match',
  templateUrl: 'match.component.html',
})
export class MatchPageComponent implements OnInit {

    match: Match;
    user: User;
    player: Player;
    joinedPlayer: boolean;
    discardedPlayer: boolean;
    menuDisable: boolean;
    matchPlayed: boolean;
    showValuations: boolean;
    showMyValuations: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private matchesService: MatchesService,
        private playerService: PlayersService,
        private context: ContextService,
        private messages: MessagesService
    ) {}

    ngOnInit() {
        this.match = this.navParams.get('matchSelected');
        this.user = this.navParams.get('user');
        this.player = this.navParams.get('player');
        this.setJoinedPlayer();
        this.setDiscardedPlayer();
        this.setMenuDisable();
        this.setMatchPlayed();
        this.setShowValuations();
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
                    case Action.EDIT_CALL_UP:
                        this.editCallUp();
                        break;
                    case Action.EDIT_DISCARDS:
                        this.editDiscards();
                        break;
                    case Action.ADD_EXTRA_PLAYER:
                        this.addExtraPlayer();
                        break;
                    case Action.REMOVE_EXTRA_PLAYER:
                        this.removeExtraPlayer();
                        break;
                }
            }
        });
        actionsPopover.present({
            ev: clickEvent
        });
    }

    goToCallUp(): void {
        this.navCtrl.push('CallUpPage', {match: this.match, reserves: false});
    }

    goToTeams(): void {
        this.navCtrl.push('TeamsPage', {match: this.match});
    }

    goToDiscards(): void {
        this.navCtrl.push('DiscardsPage', {match: this.match});
    }

    goToReserves(): void {
        this.navCtrl.push('CallUpPage', {match: this.match, reserves: true});
    }

    goToMyValuations(): void {
        this.navCtrl.push('MyValuationsPage', {match: this.match, player: this.player});
    }

    goToValuations(): void {
        this.navCtrl.push('ValuationsPage', {match: this.match});
    }

    private getOptionsAllowed(): Option[] {
        let result = AVAILABLE_OPTIONS
            .filter(
                action => {
                    let arrayResult = action.roles.filter(rol => this.user.roles.indexOf(rol) > -1);
                    return arrayResult.length > 0;
                }
            );
        if (this.match.openCallUp) {
        if (this.joinedPlayer) {
                let actions = [Action.JOIN_CALL_UP, Action.DISCARD_ME_CALL_UP, Action.EXIT_FROM_DISCARDS];
                result = this.removeOptions(result, actions);
        } else {
                let actions = [Action.UNJOIN_CALL_UP];
            if (this.discardedPlayer) {
                    actions.push(Action.JOIN_CALL_UP, Action.DISCARD_ME_CALL_UP);
            } else {
                    actions.push(Action.EXIT_FROM_DISCARDS);
                }
                result = this.removeOptions(result, actions);
            }
        } else {
            let actions = [Action.JOIN_CALL_UP, Action.UNJOIN_CALL_UP, Action.DISCARD_ME_CALL_UP, Action.EXIT_FROM_DISCARDS];
            result = this.removeOptions(result, actions);
        }
        return result;
    }

    private removeOptions(options: Option[], actions: Action[]): Option[] {
        actions.forEach(action => options.splice(options.findIndex(option => option.action === action), 1));
        return options;
    }

    private editTeams(): void {
        if (this.match.callUp.length < this.match.numPlayers) {
            this.messages.showInfo('MATCH_PAGE.CALL_UP_INCOMPLETED');
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
                                data => {
                                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                                    this.reloadMatch();
                                },
                                error => this.messages.showError(error)
                            );
                    }
                });
            dialog.present();
        }
    }

    private deleteMatch(): void {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('MATCHES_PAGE.DELETE_MATCH'),
          subTitle: this.translate.instant('MATCHES_PAGE.DELETE_SURE'),
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
                                  this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                                  this.navCtrl.pop();
                              },
                              error => this.messages.showError(error)
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
                this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                this.reloadMatch();
            }
        });
        dialog.present();
    }

    private joinCallUp(): void {
        this.matchesService.joinPlayerCallUp(this.match.id, this.player)
            .subscribe(
                data => {
                    this.joinedPlayer = true;
                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                    this.reloadMatch();
                },
                error => this.messages.showError(error)
            );
    }

    private unjoinCallUp(): void {
        this.matchesService.unjoinPlayerCallUp(this.match.id, this.player.id)
            .subscribe(
                data => {
                    this.joinedPlayer = false;
                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                    this.reloadMatch();
                },
                error => this.messages.showError(error)
            );
    }

    private discardMeCallUp(): void {
        let playerDiscard: PlayerDiscard = {
            player: {
                id: this.player.id,
                fixed: this.player.fixed,
                name: this.player.alias
            },
            dateDiscard: new Date()
        };
        this.matchesService.discardPlayerCallUp(this.match.id, playerDiscard)
            .subscribe(
                data => {
                    this.discardedPlayer = true;
                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                    this.reloadMatch();
                },
                error => this.messages.showError(error)
            );
    }

    private exitFromDiscards(): void {
        this.matchesService.exitFromDiscards(this.match.id, this.player.id)
            .subscribe(
                data => {
                    this.discardedPlayer = false;
                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                    this.reloadMatch();
                },
                error => this.messages.showError(error)
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
                            this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                        },
                        error => this.messages.showError(error)
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
            this.discardedPlayer = discards.findIndex(el => el.player.id === this.player.id) >= 0;
        } else {
            this.discardedPlayer = false;
        }
    }

    private setMenuDisable(): void {
        this.menuDisable = !(this.match.openCallUp || this.context.userLoggedIsAdmin());
    }

    private setMatchPlayed(): void {
        this.matchPlayed =
            this.match.team1 && !isUndefined(this.match.team1.goals)
            && this.match.team2 && !isUndefined(this.match.team2.goals);
    }

    private setShowValuations(): void {
        this.showMyValuations = this.matchPlayed && this.userLoggedHasPlayed();
        let fechaPartido = moment(this.match.date);
        let fechaActual = moment();
        this.showValuations = fechaActual.diff(fechaPartido, 'days') > 2;
    }

    private userLoggedHasPlayed(): boolean {
        const index = this.match.callUp.findIndex(playerCallUp => playerCallUp.player.id === this.player.id);
        return index >= 0;
    }

    private editCallUp(): void {
        this.playerService.fetchPlayers()
            .subscribe(
                players => this.showListPlayersCallUp(players),
                error => this.messages.showError(error)
            );
    }

    private editDiscards(): void {
        this.playerService.fetchPlayers()
            .subscribe(
                players => this.showListPlayersDiscards(players),
                error => this.messages.showError(error)
            );
    }

    private addExtraPlayer(): void {
        let prompt = this.alertCtrl.create({
            title: this.translate.instant('MATCH_PAGE.ACTION.ADD_EXTRA_PLAYER'),
            inputs: [
                {
                    name: 'name',
                    placeholder: this.translate.instant('MATCH_PAGE.NAME_NEW_PLAYER')
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
                                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                                    this.reloadMatch();
                                },
                                error => this.messages.showError(error)
                            );
                    }
                }
            ]
        });
        prompt.present();
    }

    private removeExtraPlayer(): void {
        let prompt = this.alertCtrl.create({
            title: this.translate.instant('MATCH_PAGE.ACTION.ADD_EXTRA_PLAYER'),
            inputs: [
                {
                    name: 'name',
                    placeholder: this.translate.instant('MATCH_PAGE.NAME_NEW_PLAYER')
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
                                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                                    this.reloadMatch();
                                },
                                error => this.messages.showError(error)
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

    private showListPlayersCallUp(players: Player[]) {
        let alert = this.alertCtrl.create();
        alert.setTitle(this.translate.instant('MATCH_PAGE.ADD_PLAYER'));
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

    private showListPlayersDiscards(players: Player[]) {
        let alert = this.alertCtrl.create();
        alert.setTitle(this.translate.instant('MATCH_PAGE.DISCARD_PLAYER'));
        players.forEach(player => {
            let checked = this.match.discards && this.match.discards.findIndex(el => el.player.id === player.id) >= 0;
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
            this.includePlayersDiscards(players, selecteds);
            this.excludePlayersDiscards(players, selecteds);
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
                            this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                            this.reloadMatch();
                        }
                    },
                    error => this.messages.showError(error)
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
                            this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                            this.reloadMatch();
                        }
                    },
                    error => this.messages.showError(error)
                );
        });
    }

    private includePlayersDiscards(players: Player[], playersId: string[]): void {
        let playersSelected = players.filter(player => {
            let isPlayerSelected = playersId.findIndex(el => el === player.id) >= 0;
            let isPlayerDiscarded = this.match.discards && this.match.discards.findIndex(el => el.player.id === player.id) >= 0;
            return !isPlayerDiscarded && isPlayerSelected;
        });
        playersSelected.forEach((player, index) => {
            let playerDiscarded: PlayerDiscard = {
                player: {
                    id: player.id,
                    fixed: player.fixed,
                    name: player.alias
                },
                dateDiscard: new Date()
            };
            this.matchesService.discardPlayerCallUp(this.match.id, playerDiscarded)
                .subscribe(
                    data => {
                        if (index === playersSelected.length - 1) {
                            this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                            this.reloadMatch();
                        }
                    },
                    error => this.messages.showError(error)
                );
        });
    }

    private excludePlayersDiscards(players: Player[], playersId: string[]): void {
        let playersNoSelected = players.filter(player => {
            let isPlayerNoSelected = playersId.findIndex(el => el === player.id) < 0;
            let isPlayerDiscarded = this.match.discards && this.match.discards.findIndex(el => el.player.id === player.id) >= 0;
            return isPlayerDiscarded && isPlayerNoSelected;
        });
        playersNoSelected.forEach((player, index) => {
            this.matchesService.exitFromDiscards(this.match.id, player.id)
                .subscribe(
                    data => {
                        if (index === playersNoSelected.length - 1) {
                            this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                            this.reloadMatch();
                        }
                    },
                    error => this.messages.showError(error)
                );
        });
    }

    private reloadMatch() {
        this.matchesService.getMatch(this.match.id)
            .subscribe(
                match => this.match = match,
                error => this.messages.showError(error)
            );
    }
}
