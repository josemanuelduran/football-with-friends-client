import { Score } from './score.model';

export interface MatchScore {
    id?: string;
    matchId: string;
    playerId?: string;
    date?: Date;
    scores: Score[];
}
