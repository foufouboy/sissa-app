/**
 * - Créer une partie utilisateur
 * - Récupérer toutes les parties d'un utilisateur
 * - Récupérer une partie d'un utilisateur
 * - Supprimer une partie d'un utilisateur
 * (- Récupérer des données statistiques des parties utilisateurs, pour le dashboard)
 */

import { GameModel } from "../models/games.model";
import { UserModel } from "../models/users.model";
import { CreateGameInput, PublicGame } from "../types/games";
import { toPublicGame, toPublicGames } from "../models/dtos/games";

export const gamesService = {
	async createGame(gameData: CreateGameInput) {
		try {
			const game = await GameModel.create(gameData);
			return game;
		} catch (error) {
			console.error("Erreur gamesService.createGame:", error);
			throw error;
		}
	},
	async getStudentsOfTeacher(teacherId: number) {
		try {
			const students = await UserModel.findStudentsOf(teacherId);
			return students;
		} catch (error) {
			console.error("Erreur gamesService.getStudentsOfTeacher:", error);
			throw error;
		}
	},
	async getGamesOfUser(userId: number): Promise<PublicGame[]> {
		try {
			const games = await GameModel.findAllGamesOfPlayer(userId);
			return toPublicGames(games);
		} catch (error) {
			console.error("Erreur gamesService.getGamesOfUser:", error);
			throw error;
		}
	},

	async getGameDetail(gameId: number): Promise<PublicGame> {
		try {
			const game = await GameModel.findById(gameId);
			return toPublicGame(game);
		} catch (error) {
			console.error("Erreur gamesService.getGameDetail:", error);
			throw error;
		}
	},

	async deleteGame(gameId: number) {
		try {
			await GameModel.delete(gameId);
		} catch (error) {
			console.error("Erreur gamesService.deleteGame:", error);
			throw error;
		}
	},

	// On verra pour la fonction stats plus tard
};

// TESTS

async function main() {
	const games = await gamesService.getGamesOfUser(1);
	console.log(games);
}

main();
