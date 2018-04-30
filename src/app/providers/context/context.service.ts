import { Injectable } from '@angular/core';

import { User, Role, Player } from '../../models';

@Injectable()
export class ContextService {

    private userLogged: User;
    private playerLogged: Player;

    constructor() {
    }

    getUserLogged(): User {
        return this.userLogged;
    }

    setUserLogged(user: User): void {
        this.userLogged = user;
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
}
