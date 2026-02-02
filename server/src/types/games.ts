// TODO: Problème un peu relou, mais quels types faire
// sachant qu'on veut représenter les données sortant de BDD ET 
// les données qu'on va réellement utiliser ?

export interface Game {
    id: number;
    pgn: string;
    white_player: string;
    black_player: string;
    result: string;
    event: string;
    game_date: Date;
    created_at: Date;
}

export type CreateGameInput = Omit<Game, "created_at" | "id">;

export interface GamePublic {
    id: number;
    pgn: string;
    whitePlayer: string;
    blackPlayer: string;
    result: string;
    event: string;
    gameDate: Date;
    createdAt: Date;
}