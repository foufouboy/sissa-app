import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";

const settingsRoutes = Router();

// récupère les paramètres de l'utilisateur
settingsRoutes.get("/", settingsController.getForCurrentUser);

// met à jour les paramètres de l'utilisateur
settingsRoutes.put("/", settingsController.updateForCurrentUser);

export default settingsRoutes;
