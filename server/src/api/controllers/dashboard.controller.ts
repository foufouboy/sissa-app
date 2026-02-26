import type { Request, Response } from "express";

export const dashboardController = {
	async getDashboard(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer les données du dashboard pour l'utilisateur connecté (résumé: quelques stats, prochains évènements, messages récents, etc.).",
		});
	},
};

