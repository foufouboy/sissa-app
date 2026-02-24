import { PrivateGame, PublicGame } from "../../types/games";

export const toPublicGame = (g: PrivateGame): PublicGame => {
    return {
        id: g.id,
        pgn: g.pgn,
        whitePlayer: g.white_player,
        blackPlayer: g.black_player,
        result: g.result,
        event: g.event,
        gameDate: g.game_date,
        createdAt: g.created_at,
    }
}

export const toPublicGames = (games: PrivateGame[]): PublicGame[] => {
    return games.map(g => toPublicGame(g));
}