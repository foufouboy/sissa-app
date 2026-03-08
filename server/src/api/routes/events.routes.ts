import { Router } from "express";
import { eventsController } from "../controllers/events.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
	validationMiddleware as validation,
	handleValidationErrors,
} from "../middlewares/validation";

const eventsRoutes = Router();

// récupère tous les évènements
// prévoir des routes pour récupérer les évènements liés à un groupe, ou à un utilisateur
eventsRoutes.get("/", auth.isConnected, eventsController.list);

// enregistre un nouvel évènement
eventsRoutes.post(
	"/",
	auth.isAdmin,
	validation.event,
	handleValidationErrors,
	eventsController.create,
);

// récupère le détail d'un évènement spécifique
eventsRoutes.get("/:event_id", auth.isConnected, eventsController.getOne);

// met à jour un évènement (droits admins)
eventsRoutes.put(
	"/:event_id",
	auth.isAdmin,
	validation.event,
	handleValidationErrors,
	eventsController.update,
);

// supprime un évènement (droits admins)
eventsRoutes.delete("/:event_id", auth.isAdmin, eventsController.remove);

export default eventsRoutes;
