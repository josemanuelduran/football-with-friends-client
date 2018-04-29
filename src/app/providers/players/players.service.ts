import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Player } from '../../models';

const PLAYER_URL = 'fwf/player';

@Injectable()
export class PlayersService {

    constructor(
        private http: HttpClient
    ) { }

    public fetchPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(PLAYER_URL);
    }

    public getPlayer(playerId: string): Observable<Player> {
        return this.http.get<Player>(`${PLAYER_URL}/${playerId}`);
    }

    public createPlayer(player: Player): Observable<Object> {
        return this.http.post(PLAYER_URL, player);
    }

    public updatePlayer(player: Player): Observable<Object> {
        return this.http.put(PLAYER_URL, player);
    }

    public deletePlayer(playerId: string): Observable<Object> {
        return this.http.delete(`${PLAYER_URL}/${playerId}`);
    }

}
