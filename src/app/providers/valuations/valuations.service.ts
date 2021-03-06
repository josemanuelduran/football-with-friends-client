import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { MatchScore } from '../../models';

const MATCH_SCORING_URL = 'fwf/matchScoring';
const MATCH_URL = 'fwf/match';

@Injectable()
export class ValuationsService {

    constructor(
        private http: HttpClient
    ) { }

    public fetchMatchScores(matchId: string, playerId: string): Observable<MatchScore> {
        let url = `${MATCH_SCORING_URL}?matchId=${matchId}&playerId=${playerId}`;
        return this.http.get<MatchScore>(url);
    }

    public fetchPlayersScores(matchId: string): Observable<any[]> {
        let url = `${MATCH_URL}/${matchId}/scores`;
        let result = this.http.get<any[]>(url);
        return result;
    }

    public createMatchScore(matchScore: MatchScore): Observable<Object> {
        return this.http.post(MATCH_SCORING_URL, matchScore);
    }

    public updateMatchScore(matchScore: MatchScore): Observable<Object> {
        return this.http.put(MATCH_SCORING_URL, matchScore);
    }

    public deleteMatchScore(matchScoreId: string): Observable<Object> {
        return this.http.delete(`${MATCH_SCORING_URL}/${matchScoreId}`);
    }
}
