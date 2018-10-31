import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Profile, Player, User, Role } from '../../models';

const USER_URL = 'fwf/user';
const PLAYER_URL = 'fwf/player';

@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient
    ) { }

    public updateProfile(profile: Profile): Observable<Object> {
        return Observable.forkJoin(
            this.updatePlayer(profile.player),
            this.updateUser(profile.user)
        );
    }

    public changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
        let token = btoa(oldPassword + ':' + newPassword);
        return this.http.put(`${USER_URL}/${userId}/changePassword`, token);
    }

    private updatePlayer(player: Player): Observable<Object> {
        return this.http.put(PLAYER_URL, player);
    }

    private updateUser(user: User): Observable<Object> {
        const userTransformed = {
            ...user,
            roles: user.roles.map(rol => Role[rol])
        };
        return this.http.put(USER_URL, userTransformed);
    }
}
