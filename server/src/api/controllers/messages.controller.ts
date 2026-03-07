import type { Request, Response } from "express";
import { messagesService } from "../../services/messages.service";

export const messagesController = {
	// TODO : une fonction pour supprimer un message (comment ?)
	async getOne(req: Request, res: Response) {
		try {
			const messageId = Number(req.params.message_id);
			const message = await messagesService.getMessageById(messageId);
			return res.status(200).json(message);
		} catch (error) {
			console.error("Erreur messagesController.getOne:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const { subject, body, infoType, messageType, userIds } = req.body;

			const messageData = {
				subject,
				body,
				infoType,
				messageType,
			};

			let message;

			if (messageType === "email") {
				message = await messagesService.sendMailToUsers(
					messageData,
					userIds,
				);
			} else {
				message = await messagesService.sendNotificationToUsers(
					messageData,
					userIds,
				);
			}

			return res.status(201).json(message);
		} catch (error) {
			console.error("Erreur messagesController.create:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
