export interface Payment {
    id?: string;
    playerId: string;
    year: number;
    month?: string;
    monthIndex?: number;
    matchId?: string;
    matchDate?: string;
    paymentDate?: Date;
    paid: boolean;
    amount: number;
    name?: string;
}
