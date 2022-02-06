import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, Role, Player } from '../../models';
import { isUndefined } from 'ionic-angular/util/util';

@Injectable()
export class ContextService {

    readyRoles$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private userLogged: User;
    private playerLogged: Player;
    private matchesPlayed: number;

    constructor() {
    }

    getUserLogged(): User {
        return this.userLogged;
    }

    setUserLogged(user: User): void {
        this.userLogged = user;
        this.readyRoles$.next(!isUndefined(this.userLogged));
    }

    getPlayerLogged(): Player {
        return this.playerLogged;
    }

    setPlayerLogged(player: Player): void {
        this.playerLogged = player;
    }

    userLoggedIsAdmin(): boolean {
        let roleAdmin: boolean;
        if (this.userLogged) {
            roleAdmin = this.userLogged.roles.findIndex(role => role === Role.ADMIN) >= 0;
        }
        return roleAdmin;
    }

    userLoggedIsTreasurer(): boolean {
        let roleTreasurer: boolean;
        if (this.userLogged) {
            roleTreasurer = this.userLogged.roles.findIndex(role => role === Role.TREASURER) >= 0;
        }
        return roleTreasurer;
    }

    setMatchesPlayed(matchesPlayed: number): void {
        this.matchesPlayed = matchesPlayed;
    }

    getMatchesPlayed(): number {
        return this.matchesPlayed;
    }
}
