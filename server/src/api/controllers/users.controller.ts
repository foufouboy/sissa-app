import type { Request, Response } from "express";

export const usersController = {
	async list(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer tous les utilisateurs pour la page de management (droits admins).",
		});
	},

	async getOne(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même) (param: user_id).",
		});
	},

	async getGames(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les parties d'un utilisateur spécifique (param: user_id).",
		});
	},

	async getMessages(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les messages d'un utilisateur spécifique (param: user_id).",
		});
	},

	async create(req: Request, res: Response) {
		return res.status(201).json({
			message:
				"Créer un nouvel utilisateur (body: email, password, firstName, lastName, role, ...).",
		});
	},

	async update(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Mettre à jour les détails d'un utilisateur spécifique (param: user_id, body: champs modifiables).",
		});
	},

	async remove(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Supprimer un utilisateur (droits admins, ou l'utilisateur lui-même) (param: user_id).",
		});
	},
};

