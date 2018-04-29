export enum TeamColor {
    BLACK, WHITE
}

export interface Match {
    id?: string;
    name: string;
    date: Date;
    team1?: Team;
    team2?: Team;
    callUp?: PlayerCallUp[];
    numPlayers: number;
    openCallUp: boolean;
    mvp?: string;
    mister?: string;
    cancelled: boolean;
}

export interface Team {
    players: SimplyPlayer[];
    color: TeamColor;
    goals: number;
}

export interface PlayerCallUp {
    player: SimplyPlayer;
    dateCallUp: Date;
}

export interface SimplyPlayer {
    name: string;
    id: string;
    fixed: boolean;
}
