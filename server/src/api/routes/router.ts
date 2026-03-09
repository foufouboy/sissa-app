/**
 * ROUTES :
 *
 */

import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import authRoutes from "./auth.routes";
import eventsRoutes from "./events.routes";
import gamesRoutes from "./games.routes";
import groupsRoutes from "./groups.routes";
import messagesRoutes from "./messages.routes";
import settingsRoutes from "./settings.routes";
import usersRoutes from "./users.routes";

const router = Router();

// récupère les données du dashboard, et front importantes (?)
// doit être connecté, sinon redirection
router.get("/", auth.isConnected, dashboardController.getDashboard);

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/games", gamesRoutes);
router.use("/events", eventsRoutes);
router.use("/messages", messagesRoutes);
router.use("/settings", settingsRoutes);
router.use("/groups", groupsRoutes);

export default router;
