import { Router } from "express";
import { gamesController } from "../controllers/games.controller";

const gamesRoutes = Router();

// récupère les parties auxquelles on a accès (soit les siennes, soit celles de ses élèves aussi)
gamesRoutes.get("/", gamesController.list);

// enregistre une nouvelle partie
gamesRoutes.post("/", gamesController.create);

// récupère les détails d'une partie spécifique
gamesRoutes.get("/:game_id", gamesController.getOne);

// supprime une partie (il faut avoir les droits pour, seulement le joueur)
gamesRoutes.delete("/:game_id", gamesController.remove);

export default gamesRoutes;
