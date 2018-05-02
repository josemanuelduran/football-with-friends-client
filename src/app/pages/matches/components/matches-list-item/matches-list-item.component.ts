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
    @Input() playerJoined: boolean;
    @Output() action: EventEmitter<Action> = new EventEmitter<Action>();

    matchClosed: boolean;
    matchCancelled: boolean;
    matchPlayed: boolean;
    matchOpen: boolean;

    constructor() { }

    ngOnInit() {
        let currentDate = Date.now();
        let matchDate = new Date(this.match.date).getTime();
        this.matchPlayed = !this.match.cancelled && matchDate < currentDate;
        this.matchClosed = !this.match.openCallUp && !this.match.cancelled && !this.matchPlayed;
        this.matchCancelled = this.match.cancelled;
        this.matchOpen = !this.matchCancelled && !this.matchClosed && !this.matchPlayed;
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
        this.action.emit(Action.DISCARD_CALL_UP);
    }

}
