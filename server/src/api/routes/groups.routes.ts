import { Router } from "express";
import { groupsController } from "../controllers/groups.controller";
import { authMiddleware as auth } from "../middlewares/auth";

const groupsRoutes = Router();

// récupère tous les groupes
groupsRoutes.get("/", auth.isAdmin, groupsController.list);

// récupère tous les utilisateurs appartenant à un groupe donné
groupsRoutes.get(
  "/:group_id/users",
  auth.isAdmin,
  groupsController.listUsersByGroup,
);

// récupère tous les messages appartenant à un groupe donné
groupsRoutes.get(
  "/:group_id/messages",
  auth.isAdmin,
  groupsController.listMessagesByGroup,
);

// récupère tous les events appartenant à un groupe donné
groupsRoutes.get(
  "/:group_id/events",
  auth.isConnected,
  groupsController.listEventsByGroup,
);

export default groupsRoutes;
