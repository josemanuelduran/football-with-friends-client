import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ViewController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Match, TeamColor, SimplyPlayer, Player } from '../../models';
import { MatchesService, MessagesService } from '../../providers';

interface PlayerTeam {
    player: SimplyPlayer;
    team: TeamColor;
}

@Component({
  selector: 'fwf-teams-maker',
  templateUrl: './teams-maker.component.html'
})
export class TeamsMakerComponent implements OnInit {

    listPlayers: PlayerTeam[];
    listPlayersWhite: PlayerTeam[];
    listPlayersBlack: PlayerTeam[];
    match: Match;
    player: Player;
    numPlayersTeam: number;
    colorWhite = TeamColor.WHITE;
    colorBlack = TeamColor.BLACK;

    constructor(
            private viewCtrl: ViewController,
            public navParams: NavParams,
            private alertCtrl: AlertController,
            private translate: TranslateService,
            private matchesService: MatchesService,
            private messages: MessagesService,
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
        this.player = this.navParams.get('player');
        this.listPlayers = this.match.callUp.map(playerCallUp => {
            let team: TeamColor =
                this.match.team1
                && this.match.team1.players.filter(el => el.id === playerCallUp.player.id).length > 0 ?
                    this.match.team1.color :
                    this.match.team2 && this.match.team2.players.filter(el => el.id === playerCallUp.player.id).length > 0 ?
                        this.match.team2.color : undefined;
            return {
                player: playerCallUp.player,
                team: team
            };
        });
        this.numPlayersTeam = this.match.numPlayers / 2;
        this.filterTeams();
    }

    onSelectChange(selected: any, playerId: string): void {
        if (selected === '---') {
            let index = this.listPlayers.findIndex(el => el.player.id === playerId);
            this.listPlayers[index].team = undefined;
        }
        this.filterTeams();
    }

    saveTeams() {
        this.match.team1 = {
            color: TeamColor.WHITE,
            players: this.listPlayersWhite.map(el => el.player)
        };
        this.match.team2 = {
            color: TeamColor.BLACK,
            players: this.listPlayersBlack.map(el => el.player)
        };
        this.match.mister = {
            name: this.player.alias,
            id: this.player.id,
            fixed: this.player.fixed
        };
        this.matchesService.updateTeams(this.match.id, this.player.id, [this.match.team1, this.match.team2])
            .subscribe(
                data => this.viewCtrl.dismiss(true),
                error => this.messages.showError(error)
            );
    }

    cancel(): void {
        let alert = this.alertCtrl.create({
            title: this.translate.instant('ADD_MATCH_PAGE.CANCEL'),
            subTitle: this.translate.instant('ADD_MATCH_PAGE.SURE'),
            buttons: [
                {
                    text: this.translate.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'ok',
                    handler: data => {
                        this.viewCtrl.dismiss(false);
                    }
                },
            ]
          });
          alert.present();
    }

    private filterTeams(): void {
        this.listPlayersWhite = this.listPlayers.filter(el => el.team === TeamColor.WHITE);
        this.listPlayersBlack = this.listPlayers.filter(el => el.team === TeamColor.BLACK);
    }

}
