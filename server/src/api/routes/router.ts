/**
 * ROUTES :
 *
 */

import { Router } from "express";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
import gamesRoutes from "./games.routes";
import eventsRoutes from "./events.routes";
import messagesRoutes from "./messages.routes";
import settingsRoutes from "./settings.routes";
import groupsRoutes from "./groups.routes";
import { dashboardController } from "../controllers/dashboard.controller";

const router = Router();

// récupère les données du dashboard, et front importantes (?)
// doit être connecté, sinon redirection
router.get("/", dashboardController.getDashboard);

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/games", gamesRoutes);
router.use("/events", eventsRoutes);
router.use("/messages", messagesRoutes);
router.use("/settings", settingsRoutes);
router.use("/groups", groupsRoutes);

export default router;
