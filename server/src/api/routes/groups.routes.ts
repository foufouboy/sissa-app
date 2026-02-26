import { Router } from "express";
import { groupsController } from "../controllers/groups.controller";

const groupsRoutes = Router();

// récupère tous les utilisateurs appartenant à un groupe donné
groupsRoutes.get("/:group_id/users", groupsController.listUsersByGroup);

// récupère tous les messages appartenant à un groupe donné
groupsRoutes.get("/:group_id/messages", groupsController.listMessagesByGroup);

// récupère tous les events appartenant à un groupe donné
groupsRoutes.get("/:group_id/events", groupsController.listEventsByGroup);

export default groupsRoutes;
