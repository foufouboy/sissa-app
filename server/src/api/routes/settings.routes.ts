import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";
import { authMiddleware as auth } from "../middlewares/auth";

const settingsRoutes = Router();

// récupère les paramètres de l'utilisateur
settingsRoutes.get("/", auth.isConnected, settingsController.getForCurrentUser);

// met à jour les paramètres de l'utilisateur
settingsRoutes.put(
	"/",
	auth.isConnected,
	settingsController.updateForCurrentUser,
);

export default settingsRoutes;
