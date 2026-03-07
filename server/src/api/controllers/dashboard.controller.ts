import type { Request, Response } from "express";
import { widgetsService } from "../../services/widgets.service";

export const dashboardController = {
	async getDashboard(req: Request, res: Response) {
		try {
			const userId = Number(req.query.userId);

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre userId manquant ou invalide" });
			}

			const widgets = await widgetsService.getDashboardWidgets(userId);

			return res.status(200).json(widgets);
		} catch (error) {
			console.error("Erreur dashboardController.getDashboard:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
