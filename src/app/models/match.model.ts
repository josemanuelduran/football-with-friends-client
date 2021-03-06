export enum TeamColor {
    WHITE = 'WHITE', BLACK = 'BLACK'
}

export interface Match {
    id?: string;
    name: string;
    date: string;
    team1?: Team;
    team2?: Team;
    callUp?: PlayerCallUp[];
    numPlayers: number;
    openCallUp: boolean;
    mvp?: string;
    mister?: SimplyPlayer;
    cancelled: boolean;
    discards?: PlayerDiscard[];
    reserves?: PlayerCallUp[];
    played?: boolean;
}

export interface Team {
    players: SimplyPlayer[];
    color: TeamColor;
    goals?: number;
}

export interface PlayerCallUp {
    player: SimplyPlayer;
    dateCallUp: Date;
}

export interface SimplyPlayer {
    name: string;
    id?: string;
    fixed: boolean;
}

export interface PlayerDiscard {
    player: SimplyPlayer;
    dateDiscard: Date;
}
