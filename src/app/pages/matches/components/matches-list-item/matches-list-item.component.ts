import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

import { Match, Action } from '../../../../models';

@Component({
  selector: 'fwf-matches-list-item',
  templateUrl: 'matches-list-item.component.html'
})
export class MatchesListItemComponent implements OnInit {

    @Input() match: Match;
    @Input() isAdmin: boolean;
    @Input() playerId: string;
    @Output() action: EventEmitter<Action> = new EventEmitter<Action>();

    matchClosed: boolean;
    matchCancelled: boolean;
    matchPlayed: boolean;
    matchOpen: boolean;
    playerJoined: boolean;
    playerDiscarded: boolean;

    constructor() { }

    ngOnInit() {
        let currentDate = Date.now();
        let matchDate = new Date(this.match.date).getTime() + 75600000; // Match day at 21:00h
        this.matchPlayed = (!this.match.cancelled && matchDate < currentDate) || this.match.played;
        this.matchClosed = !this.match.openCallUp && !this.match.cancelled && !this.matchPlayed;
        this.matchCancelled = this.match.cancelled;
        this.matchOpen = !this.matchCancelled && !this.matchClosed && !this.matchPlayed;
        this.setPlayerJoined();
        this.setPlayerDiscarded();
    }

    matchSelected(): void {
        this.action.emit(Action.VIEW_DETAILS);
    }

    delete(slidingItem: ItemSliding): void {
        slidingItem.close();
        this.action.emit(Action.DELETE_MATCH);
    }

    edit(slidingItem: ItemSliding): void {
        slidingItem.close();
        this.action.emit(Action.EDIT_MATCH);
    }

    joinCallUp(slidingItem: ItemSliding): void {
        slidingItem.close();
        this.action.emit(Action.JOIN_CALL_UP);
    }

    unjoinCallUp(slidingItem: ItemSliding): void {
        slidingItem.close();
        this.action.emit(Action.UNJOIN_CALL_UP);
    }

    discardCallUp(slidingItem: ItemSliding): void {
        slidingItem.close();
        this.action.emit(Action.DISCARD_ME_CALL_UP);
    }

    private setPlayerJoined(): void {
        let callUp = this.match.callUp;
        if (callUp) {
            this.playerJoined = callUp.findIndex(el => el.player.id === this.playerId) >= 0;
        } else {
            this.playerJoined = false;
        }
    }

    private setPlayerDiscarded(): void {
        let discards = this.match.discards;
        if (discards) {
            this.playerDiscarded = discards.findIndex(el => el.player.id === this.playerId) >= 0;
        } else {
            this.playerDiscarded = false;
        }
    }

}
