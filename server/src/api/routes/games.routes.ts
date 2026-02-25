import { Router } from "express";

const gamesRoutes = Router();

// récupère les parties auxquelles on a accès (soit les siennes, soit celles de ses élèves aussi)
gamesRoutes.get("/", (req, res) => {});

// enregistre une nouvelle partie
gamesRoutes.post("/", (req, res) => {});

// récupère les détails d'une partie spécifique
gamesRoutes.get("/:game_id", (req, res) => {});

// supprime une partie (il faut avoir les droits pour, seulement le joueur)
gamesRoutes.delete("/:game_id", (req, res) => {});

export default gamesRoutes;
