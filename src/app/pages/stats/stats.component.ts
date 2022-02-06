import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// import { TranslateService } from '@ngx-translate/core';

import { PlayerStats, Player } from '../../models';
import { ContextService, MessagesService, StatsService } from '../../providers';

@IonicPage({
    name: 'StatsPage',
    segment: 'stats'
})
@Component({
    selector: 'fwf-page-stats',
    templateUrl: 'stats.component.html',
})
export class StatsPageComponent implements OnInit {

    stats: PlayerStats;
    playerLogged: Player;
    totalMatchesPlayed: number;

    matchesPlayedByPlayer: number;
    matchesWonByPlayer: number;
    matchesLostByPlayer: number;
    matchesTiedByPlayer: number;

    constructor(
        private statsService: StatsService,
        // private translate: TranslateService,
        private context: ContextService,
        private messages: MessagesService,
    ) {
      this.playerLogged = this.context.getPlayerLogged();
      this.totalMatchesPlayed = this.context.getMatchesPlayed();
    }

    ngOnInit(): void {
        // It's necessary when comes here from back button'
        this.loadStats();
    }

    private loadStats(): void {
        this.statsService.fetchPlayerStats(this.playerLogged.id)
          .subscribe(
              data => {
                this.stats = data;
                this.matchesPlayedByPlayer = this.stats.matchesPlayedAsBlack + this.stats.matchesPlayedAsWhite;
                this.matchesWonByPlayer = this.stats.matchesWonAsWhite + this.stats.matchesWonAsBlack;
                this.matchesLostByPlayer = this.stats.matchesLostAsWhite + this.stats.matchesLostAsBlack;
                this.matchesTiedByPlayer = this.stats.matchesTiedAsWhite + this.stats.matchesTiedAsBlack;
              },
              error => this.messages.showError(error)
          );
    }

}
