export enum Position {
    DEFENDER,
    MIDFIELD,
    FORWARD,
    SWEEPER,
    LEFT_BACK,
    RIGHT_BACK
}

export interface Player {
    id: string;
    alias: string;
    fullName?: string;
    currentScore?: number;
    mainPosition?: Position;
    secondPosition?: Position;
    tertiaryPosition?: Position;
    fixed: boolean;
    active?: boolean;
    registerDate?: Date;
    fixedDate?: Date;
    user?: string;
    phoneNumber?: string;
    email?: string;
}
