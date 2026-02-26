import { Router } from "express";
import { eventsController } from "../controllers/events.controller";

const eventsRoutes = Router();

// récupère tous les évènements dont on a besoin
eventsRoutes.get("/", eventsController.list);

// enregistre un nouvel évènement
eventsRoutes.post("/", eventsController.create);

// récupère le détail d'un évènement spécifique
eventsRoutes.get("/:event_id", eventsController.getOne);

// met à jour un évènement (droits admins)
eventsRoutes.put("/:event_id", eventsController.update);

// supprime un évènement (droits admins)
eventsRoutes.delete("/:event_id", eventsController.remove);

export default eventsRoutes;
