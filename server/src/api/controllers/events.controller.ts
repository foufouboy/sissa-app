import type { Request, Response } from "express";

export const eventsController = {
	async list(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer tous les évènements pertinents pour l'utilisateur.",
		});
	},

	async create(req: Request, res: Response) {
		return res.status(201).json({
			message:
				"Enregistrer un nouvel évènement (body: location, dates, title, description, groups, ...).",
		});
	},

	async getOne(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer le détail d'un évènement spécifique (param: event_id).",
		});
	},

	async update(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Mettre à jour un évènement existant (droits admins) (param: event_id, body: champs modifiables).",
		});
	},

	async remove(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Supprimer un évènement (droits admins) (param: event_id).",
		});
	},
};
