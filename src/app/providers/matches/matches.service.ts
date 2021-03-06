import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Match, Player, Team, PlayerDiscard } from '../../models';

const MATCH_URL = 'fwf/match';

@Injectable()
export class MatchesService {

    constructor(
        private http: HttpClient
    ) { }

    public getMatch(matchId: string): Observable<Match> {
        return this.http.get<Match>(`${MATCH_URL}/${matchId}`);
    }
    public fetchMatches(): Observable<Match[]> {
        return this.http.get<Match[]>(MATCH_URL);
    }

    public createMatch(match: Match): Observable<Object> {
        return this.http.post(MATCH_URL, match);
    }

    public updateMatch(match: Match): Observable<Object> {
        return this.http.put(MATCH_URL, match);
    }

    public deleteMatch(matchId: string): Observable<Object> {
        return this.http.delete(`${MATCH_URL}/${matchId}`);
    }

    public joinPlayerCallUp(matchId: string, player: Player): Observable<Object> {
        return this.http.put(`${MATCH_URL}/${matchId}/player`, player);
    }

    public unjoinPlayerCallUp(matchId: string, playerId: string): Observable<Object> {
        return this.http.put(`${MATCH_URL}/${matchId}/player/${playerId}`, {});
    }

    public discardPlayerCallUp(matchId: string, player: PlayerDiscard): Observable<Object> {
        return this.http.put(`${MATCH_URL}/${matchId}/discards`, player);
    }

    public exitFromDiscards(matchId: string, playerId: string): Observable<Object> {
        return this.http.put(`${MATCH_URL}/${matchId}/discards/player/${playerId}`, {});
    }

    public updateTeams(matchId: string, playerId: string, teams: Team[]): Observable<Object> {
        return this.http.put(`${MATCH_URL}/${matchId}/teams/${playerId}`, teams);
    }
}
