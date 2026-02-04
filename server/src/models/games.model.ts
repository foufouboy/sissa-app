import { query } from "../config/db";
import { CreateGameInput, Game, GamePublic } from "../types/games";
import { toPublicGame, toPublicGames } from "./dtos/games";

export const GameModel = {
    async findAllGamesOfPlayer(userId: number): Promise<GamePublic[]> {
        try {
            const result = await query<Game>(`
                SELECT * FROM games
                WHERE user_id = $1
            `, [userId]);

            return toPublicGames(result);
        } catch (error) {
            console.error("Erreur lors de la récupération des parties:", error);
            throw error;
        }
    },

    async findById(id: number): Promise<GamePublic> {
        // TODO 
        const result = await query<Game>(
            `SELECT * FROM games WHERE id = $1
            LIMIT 1`,
            [id]
        );

        if (!result[0]) {
            throw new Error("Partie non trouvée");
        }

        return toPublicGame(result[0]);
    },

    async create(data: CreateGameInput) {
        try {
            const { pgn, white_player, black_player, result, event, game_date } = data;

            return await query(`
                INSERT INTO users (pgn, white_player, black_player, result, event, game_date)
                VALUES ($1, $2, $3, $4, $5, $6)     
            `, [pgn, white_player, black_player, result, event, game_date])
        } catch (error) {
            console.error("Erreur lors de la création de la partie", error);
            throw error;
        }
    },

    async delete(id: number) {
        try {
            await query(
                `DELETE FROM games
                WHERE id = $1`,
                [id]
            );
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            throw error;
        }
    }
};

// TESTS 

async function main() {

    const games = await GameModel.findById(1);

    console.log(games);
}

main();