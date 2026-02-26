import type { Request, Response } from "express";

export const messagesController = {
	async getOne(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer le détail d'un message spécifique (param: message_id).",
		});
	},

	async create(req: Request, res: Response) {
		return res.status(201).json({
			message:
				"Créer un nouveau message et l'envoyer à une liste d'utilisateurs (body: subject, body, infoType, messageType, userIds).",
		});
	},
};

