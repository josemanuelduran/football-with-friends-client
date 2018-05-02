import { Role } from './user.model';

export enum Action {
    VIEW_DETAILS,
    DELETE_MATCH,
    EDIT_MATCH,
    JOIN_CALL_UP,
    UNJOIN_CALL_UP,
    DISCARD_CALL_UP,
    EDIT_TEAMS,
    SET_SCOREBOARD
}

export interface Option {
    action: Action;
    roles: Role[];
    token: string;
    icon: string;
}
