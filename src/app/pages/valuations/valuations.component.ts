import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Match, Score } from '../../models';
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
    scores: Score[];

    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            private valuationsService: ValuationsService,
            private messages: MessagesService
    ) { }

    ngOnInit() {
        this.match = this.navParams.get('match');
        this.loadScores();
    }

    private loadScores(): void {
        this.valuationsService.fetchPlayersScores(this.match.id)
            .subscribe(
                data => {
                    if (!data) {
                        this.createNewScores();
                    } else {
                        this.scores = data.map(item => {
                            return <Score>{
                                namePlayer: item.player.name,
                                idPlayer: item.player.id,
                                score: ((<number>item.totalScore) / (<number>item.numVotes)),
                                voted: item.voted,
                            };
                        });
                        this.scores.sort((a, b) => {
                            if (a.score > b.score) {
                                return -1;
                            } else if (a.score < b.score) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }
                },
                error => this.messages.showError(error)
            );
    }

    private createNewScores(): void {
        this.scores = [];
        this.match.callUp.forEach(item => {
            let score: Score = {
                namePlayer: item.player.name,
                idPlayer: item.player.id
            };
            this.scores.push(score);
        });
    }
}
