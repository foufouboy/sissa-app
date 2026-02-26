import type { Request, Response } from "express";

export const groupsController = {
	async listUsersByGroup(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer tous les utilisateurs appartenant à un groupe donné (param: group_id).",
		});
	},

	async listMessagesByGroup(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer tous les messages associés à un groupe donné (param: group_id).",
		});
	},

	async listEventsByGroup(req: Request, res: Response) {
		return res.status(200).json({
			message:
				"Récupérer tous les évènements associés à un groupe donné (param: group_id).",
		});
	},
};

