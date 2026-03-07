import type { Request, Response } from "express";
import { eventsService } from "../../services/events.service";

export const eventsController = {
	async list(req: Request, res: Response) {
		try {
			const events = await eventsService.getAllEvents();
			return res.status(200).json(events);
		} catch (error) {
			console.error("Erreur eventsController.list:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const {
				location,
				startDate,
				endDate,
				allDay,
				title,
				description,
				memberGroupsIds,
			} = req.body;

			await eventsService.createEvent({
				location,
				startDate,
				endDate,
				allDay,
				title,
				description,
				memberGroupsIds,
			});

			return res
				.status(201)
				.json({ message: "Évènement créé avec succès" });
		} catch (error) {
			console.error("Erreur eventsController.create:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async getOne(req: Request, res: Response) {
		try {
			const eventId = Number(req.params.event_id);
			const event = await eventsService.getEventDetail(eventId);
			return res.status(200).json(event);
		} catch (error) {
			console.error("Erreur eventsController.getOne:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const eventId = Number(req.params.event_id);
			const {
				location,
				startDate,
				endDate,
				allDay,
				title,
				description,
				memberGroupsIds,
			} = req.body;

			await eventsService.updateEvent(eventId, {
				location,
				startDate,
				endDate,
				allDay,
				title,
				description,
				memberGroupsIds,
			});

			return res
				.status(200)
				.json({ message: "Évènement mis à jour avec succès" });
		} catch (error) {
			console.error("Erreur eventsController.update:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const eventId = Number(req.params.event_id);
			await eventsService.deleteEvent(eventId);

			return res
				.status(200)
				.json({ message: "Évènement supprimé avec succès" });
		} catch (error) {
			console.error("Erreur eventsController.remove:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
