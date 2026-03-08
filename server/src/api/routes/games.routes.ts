import { Router } from "express";
import { gamesController } from "../controllers/games.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
	validationMiddleware as validation,
	handleValidationErrors,
} from "../middlewares/validation";

const gamesRoutes = Router();

// récupère les parties auxquelles on a accès (soit les siennes, soit celles de ses élèves aussi)
// pareil que pour les évènements ; scinder les routes
gamesRoutes.get("/", auth.isUserOrTeacherOf, gamesController.list);

gamesRoutes.post(
	"/",
	auth.isConnected,
	validation.game,
	handleValidationErrors,
	gamesController.create,
);

// récupère les détails d'une partie spécifique
gamesRoutes.get("/:game_id", auth.isUserOrTeacherOf, gamesController.getOne);

// supprime une partie (il faut avoir les droits pour, seulement le joueur)
gamesRoutes.delete("/:game_id", auth.isUser, gamesController.remove);

export default gamesRoutes;
