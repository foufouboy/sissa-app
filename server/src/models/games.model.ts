import { query } from "../config/db";
import { CreateGameInput, PrivateGame, UpdateGameInput } from "../types/games";

export const GameModel = {
	async findAllGamesOfPlayer(userId: number): Promise<PrivateGame[]> {
		try {
			const result = await query<PrivateGame>(
				`
                SELECT * FROM games
                WHERE user_id = $1
            `,
				[userId],
			);

			return result;
		} catch (error) {
			console.error("Erreur lors de la récupération des parties:", error);
			throw error;
		}
	},

	async findById(id: number): Promise<PrivateGame> {
		try {
			const result = await query<PrivateGame>(
				`SELECT * FROM games WHERE id = $1
            LIMIT 1`,
				[id],
			);

			if (!result[0]) {
				throw new Error("Partie non trouvée");
			}

			return result[0];
		} catch (error) {
			console.error(
				`Erreur lors de la récupération de la partie ${id}:`,
				error,
			);
			throw error;
		}
	},

	async create(data: CreateGameInput) {
		try {
			const {
				pgn,
				whitePlayer,
				blackPlayer,
				result,
				event,
				gameDate,
				userId,
			} = data;

			return await query(
				`
                INSERT INTO games (pgn, white_player, black_player, result, event, game_date, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)     
            `,
				[
					pgn,
					whitePlayer,
					blackPlayer,
					result,
					event,
					gameDate,
					userId,
				],
			);
		} catch (error) {
			console.error("Erreur lors de la création de la partie:", error);
			throw error;
		}
	},

	async update(id: number, data: UpdateGameInput): Promise<PrivateGame> {
		try {
			const result = await query<PrivateGame>(
				`UPDATE games SET pgn = $1 WHERE id = $2 RETURNING *`,
				[data.pgn, id],
			);

			if (!result[0]) {
				throw new Error("Partie non trouvée");
			}

			return result[0];
		} catch (error) {
			console.error(
				`Erreur lors de la mise à jour de la partie ${id}:`,
				error,
			);
			throw error;
		}
	},

	async delete(id: number) {
		try {
			await query(
				`DELETE FROM games
                WHERE id = $1`,
				[id],
			);
		} catch (error) {
			console.error("Erreur lors de la suppression de la partie:", error);
			throw error;
		}
	},
};
