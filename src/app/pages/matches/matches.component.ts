import { Component, OnInit } from '@angular/core';
import {
    IonicPage,
    Refresher,
    AlertController,
    NavController,
    ModalController,
    // NavParams,
} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import * as moment from 'moment';

import { Match, User, Action, Player, PlayerDiscard} from '../../models';
import { MatchesService, MessagesService } from '../../providers';
import { ContextService } from '../../providers';
import { AddMatchComponent } from '../../components';

interface MatchesGroup {
    group: string;
    matches: MatchMonthYear[];
    isExpanded: boolean;
}

interface MatchMonthYear {
    monthYear: String;
    match: Match;
}
@IonicPage({
    name: 'MatchesPage',
    segment: 'matches'
})
@Component({
    selector: 'fwf-page-matches',
    templateUrl: 'matches.component.html',
})
export class MatchesPageComponent implements OnInit {

    isAdmin: boolean;
    groupedMatches: MatchesGroup[];
    matches: Match[] = [];
    userLogged: User;
    playerLogged: Player;

    constructor(
        private navCtrl: NavController,
        // private navParams: NavParams,
        private matchesService: MatchesService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private translate: TranslateService,
        private context: ContextService,
        private messages: MessagesService,
    ) {
        this.userLogged = this.context.getUserLogged();
        this.isAdmin = this.context.userLoggedIsAdmin();
        this.playerLogged = this.context.getPlayerLogged();
     }

    ionViewWillEnter() {
        // It's necessary when comes here from back button'
        this.loadListMatches();
    }

    ngOnInit() {

    }

    doAction(matchSelected: Match, action: Action): void {
        switch (action) {
            case Action.VIEW_DETAILS:
                this.navCtrl.push('MatchPage',
                    {
                        matchSelected: matchSelected,
                        user: this.userLogged,
                        player: this.playerLogged
                    }
                );
                break;
            case Action.DELETE_MATCH:
                this.delete(matchSelected);
                break;
            case Action.EDIT_MATCH:
                this.edit(matchSelected);
                break;
            case Action.JOIN_CALL_UP:
                this.joinCallUp(matchSelected);
                break;
            case Action.UNJOIN_CALL_UP:
                this.unjoinCallUp(matchSelected);
                break;
            case Action.DISCARD_ME_CALL_UP:
                this.discardMeCallUp(matchSelected);
                break;
        }
    }

    openSearchBox(): void {
    }

    addMatch(): void {
        let dialog = this.modalCtrl.create(AddMatchComponent, {}, {enableBackdropDismiss: false});
        dialog.onDidDismiss((actionOk: boolean) => {
            if (actionOk) {
                this.loadListMatches();
            }
        });
        dialog.present();
    }

    loadListMatches(refresher?: Refresher): void {
        this.groupedMatches = undefined;
        this.matchesService
            .fetchMatches()
            .subscribe(
                data => {
                    let matches = data.map(match => {
                        let dateString = match.date;
                        dateString = dateString.split('.')[0] + 'Z';
                        return <Match> {
                            ...match,
                            date: dateString
                        };
                    });
                    this.initializeList(matches);
                },
                err => {
                    this.endAnimations(refresher);
                    this.messages.showError(err);
                },
                () => this.endAnimations(refresher)
            );
    }

    private delete(matchSelected: Match): void {
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
                        this.matchesService.deleteMatch(matchSelected.id)
                            .subscribe(
                                data => {
                                    this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                                    this.loadListMatches();
                                },
                                error => this.messages.showError(error)
                            );
                    }
                },
            ]
          });
          alert.present();
    }

    private edit(matchSelected: Match): void {
        let dialog = this.modalCtrl.create(AddMatchComponent, {match: matchSelected}, {enableBackdropDismiss: false});
        dialog.onDidDismiss((actionOk: boolean) => {
            if (actionOk) {
                this.loadListMatches();
            }
        });
        dialog.present();
    }

    private joinCallUp(matchSelected: Match): void {
        this.matchesService.joinPlayerCallUp(matchSelected.id, this.playerLogged)
            .subscribe(
                data => this.loadListMatches(),
                error => this.messages.showError(error)
            );
    }

    private unjoinCallUp(matchSelected: Match): void {
        this.matchesService.unjoinPlayerCallUp(matchSelected.id, this.userLogged.playerId)
            .subscribe(
                data => this.loadListMatches(),
                error => this.messages.showError(error)
            );
    }

    private discardMeCallUp(matchSelected: Match): void {
        let playerDiscard: PlayerDiscard = {
            player: {
                id: this.playerLogged.id,
                fixed: this.playerLogged.fixed,
                name: this.playerLogged.alias
            },
            dateDiscard: new Date()
        };
        this.matchesService.discardPlayerCallUp(matchSelected.id, playerDiscard)
            .subscribe(
                data => this.loadListMatches(),
                error => this.messages.showError(error)
            );
    }

    private endAnimations(refresher: Refresher) {
        if (refresher) {
            refresher.complete();
        }
    }

    private initializeList(data: Match[]) {
        let matchesMonthYear: MatchMonthYear[] = this.transformList(data);
        this.groupedMatches = this.getGroupedMatches(matchesMonthYear);
    }

    private getGroupedMatches(matches: MatchMonthYear[]): MatchesGroup[] {
        let groupedMatches: MatchesGroup[];
        groupedMatches = _(matches).sortBy('match.date', 'desc')
            .groupBy('monthYear')
            .toPairs()
            .map(function (currentGroup) {
                return _.zipObject(['monthYear', 'matches'], currentGroup);
            })
            .map((group: any) => {
                return {
                    group: group.monthYear,
                    matches: group.matches,
                    isExpanded: true
                };
            })
            .value();
        return groupedMatches;
    }

    private transformList(matches: Match[]): MatchMonthYear[] {
        return matches.map(match => {
            let month = moment(match.date).format('MMMM');
            let year = new Date(match.date).getFullYear();
            return {
                monthYear: `${month} ${year}`,
                match: match
            };
        });
    }
}
