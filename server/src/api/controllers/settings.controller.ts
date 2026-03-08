import type { Request, Response } from "express";
import { settingsService } from "../../services/settings.service";

export const settingsController = {
	async getForCurrentUser(req: Request, res: Response) {
		try {
			if (!req.user) {
				return res.status(401).json({ message: "Non authentifié" });
			}

			const userId = req.user.id;
			const settings = await settingsService.getSettingsForUser(userId);
			return res.status(200).json(settings);
		} catch (error) {
			console.error(
				"Erreur settingsController.getForCurrentUser:",
				error,
			);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async updateForCurrentUser(req: Request, res: Response) {
		try {
			const userId = Number(req.query.userId);
			const { preferences } = req.body;

			const settings = await settingsService.updateSettingsForUser({
				userId,
				preferences,
			});

			return res.status(200).json(settings);
		} catch (error) {
			console.error(
				"Erreur settingsController.updateForCurrentUser:",
				error,
			);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
