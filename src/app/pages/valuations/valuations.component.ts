import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Match, Player, MatchScore, Score } from '../../models';
import { ValuationsService, MessagesService } from '../../providers';

@IonicPage({
    name: 'ValuationsPage'
})
@Component({
  selector: 'fwf-page-valuations',
  templateUrl: 'valuations.component.html',
})
export class ValuationsPageComponent implements OnInit {

    match: Match;
    matchScore: MatchScore;
    playerConnected: Player;

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            private valuationsService: ValuationsService,
            private messages: MessagesService
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
        this.playerConnected = this.navParams.get('player');
        this.loadScores();
    }

    saveScores(): void {
        this.matchScore.date = new Date();
        if (this.matchScore.id) {
            this.valuationsService.updateMatchScore(this.matchScore)
                .subscribe(
                    data => {
                        this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                        this.navCtrl.pop();
                    },
                    error => this.messages.showError(error)
                );
        } else {
            this.valuationsService.createMatchScore(this.matchScore)
                .subscribe(
                    data => {
                        this.messages.showSuccess('ACTION_OK', 'CONFIRMATION');
                        this.navCtrl.pop();
                    },
                    error => this.messages.showError(error)
                );
        }
    }

    private loadScores(): void {
        this.valuationsService.fetchMatchScores(this.match.id, this.playerConnected.id)
            .subscribe(
                data => {
                    if (!data) {
                        this.createNewScores();
                    } else {
                        this.matchScore = data;
                    }
                },
                error => this.messages.showError(error)
            );
    }

    private createNewScores(): void {
        this.matchScore = {
            matchId: this.match.id,
            playerId: this.playerConnected.id,
            scores: []
        };
        this.match.callUp.forEach(item => {
            if (item.player.id !== this.playerConnected.id) {
                let score: Score = {
                    namePlayer: item.player.name,
                    idPlayer: item.player.id
                };
                this.matchScore.scores.push(score);
            }
        });
    }
}
