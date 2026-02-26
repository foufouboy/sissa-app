import type { Request, Response } from "express";

export const settingsController = {
	async getForCurrentUser(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les paramètres de l'utilisateur connecté (à partir de son identité/auth).",
		});
	},

	async updateForCurrentUser(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Mettre à jour les paramètres de l'utilisateur connecté (body: préférences).",
		});
	},
};

