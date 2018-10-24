import { Player } from './player.model';
import { User } from './user.model';

export interface Profile {
    user: User;
    player: Player;
    alias: string;
    fullName: string;
    fixed: boolean;
    phoneNumber?: string;
    email?: string;
    username: string;
}
