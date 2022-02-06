import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { PlayerStats } from '../../models';

const STATS_URL = 'fwf/playerStats';

@Injectable()
export class StatsService {

    constructor(
        private http: HttpClient
    ) { }

    public fetchPlayerStats(playerId: string): Observable<PlayerStats> {
        let url = `${STATS_URL}?playerId=${playerId}`;
        return this.http.get<PlayerStats>(url);
    }

}
