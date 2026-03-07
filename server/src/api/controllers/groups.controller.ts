import type { Request, Response } from "express";
import { usersService } from "../../services/users.service";
import { messagesService } from "../../services/messages.service";
import { eventsService } from "../../services/events.service";

export const groupsController = {
	async listUsersByGroup(req: Request, res: Response) {
		try {
			const groupId = Number(req.params.group_id);
			const users = await usersService.getUsersOfGroup(groupId);
			return res.status(200).json(users);
		} catch (error) {
			console.error("Erreur groupsController.listUsersByGroup:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async listMessagesByGroup(req: Request, res: Response) {
		try {
			const groupId = Number(req.params.group_id);
			const messages = await messagesService.getAllFromGroup(groupId);
			return res.status(200).json(messages);
		} catch (error) {
			console.error("Erreur groupsController.listMessagesByGroup:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async listEventsByGroup(req: Request, res: Response) {
		try {
			const groupId = Number(req.params.group_id);
			const groupIds = [groupId];
			const events = await eventsService.getGroupsEvents(groupIds);
			return res.status(200).json(events);
		} catch (error) {
			console.error("Erreur groupsController.listEventsByGroup:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};