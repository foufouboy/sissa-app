import type { Request, Response } from "express";

export const gamesController = {
	async list(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les parties auxquelles l'utilisateur connecté a accès (les siennes, et éventuellement celles de ses élèves).",
		});
	},

	async create(req: Request, res: Response) {
		return res.status(201).json({
			message:
				"Enregistrer une nouvelle partie (body: pgn, white_player, black_player, result, event, game_date, user_id).",
		});
	},

	async getOne(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les détails d'une partie spécifique (param: game_id).",
		});
	},

	async remove(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Supprimer une partie (uniquement si l'utilisateur a les droits nécessaires) (param: game_id).",
		});
	},
};

