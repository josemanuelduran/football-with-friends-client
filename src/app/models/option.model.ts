import { Role } from './user.model';

export enum Action {
    VIEW_DETAILS,
    DELETE_MATCH,
    EDIT_MATCH,
    JOIN_CALL_UP,
    UNJOIN_CALL_UP,
    DISCARD_ME_CALL_UP,
    EXIT_FROM_DISCARDS,
    EDIT_TEAMS,
    SET_SCOREBOARD,
    EDIT_CALL_UP,
    EDIT_DISCARDS,
    ADD_NEW_PLAYER,
}

export interface Option {
    action: Action;
    roles: Role[];
    token: string;
    icon: string;
}
