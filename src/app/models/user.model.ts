export enum Role {
    ADMIN,
    PLAYER,
    TREASURER,
    COACH,
    GUEST
}

export interface User {
    id: string;
    fullname: string;
    roles?: Role[];
    playerId: string;
    username: string;
    active: boolean;
}
