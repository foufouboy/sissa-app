import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
	validationMiddleware as validation,
	handleValidationErrors,
} from "../middlewares/validation";

const settingsRoutes = Router();

// récupère les paramètres de l'utilisateur
settingsRoutes.get("/", auth.isConnected, settingsController.getForCurrentUser);

// met à jour les paramètres de l'utilisateur
settingsRoutes.put(
	"/",
	auth.isConnected,
	validation.settings,
	handleValidationErrors,
	settingsController.updateForCurrentUser,
);

export default settingsRoutes;
