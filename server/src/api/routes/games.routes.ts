import { Router } from "express";
import { gamesController } from "../controllers/games.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
  handleValidationErrors,
  validationMiddleware as validation,
} from "../middlewares/validation";

const gamesRoutes = Router();

// récupère toutes les parties d'un utilisateur spécifique
gamesRoutes.get("/", auth.isConnected, gamesController.list);

gamesRoutes.post(
  "/",
  auth.isConnected,
  validation.game,
  handleValidationErrors,
  gamesController.create,
);

// récupère les détails d'une partie spécifique
gamesRoutes.get("/:game_id", auth.isOwnerOfGame, gamesController.getOne);

// met à jour le pgn d'une partie
gamesRoutes.put(
  "/:game_id",
  auth.isOwnerOfGame,
  validation.gamePgn,
  handleValidationErrors,
  gamesController.update,
);

// supprime une partie (il faut avoir les droits pour, seulement le joueur)
gamesRoutes.delete("/:game_id", auth.isOwnerOfGame, gamesController.remove);

export default gamesRoutes;
