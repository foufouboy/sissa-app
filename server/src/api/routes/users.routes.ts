import { Router } from "express";

const usersRoutes = Router();

// récupère tous les utilisateurs pour la page de management (droits admins)
usersRoutes.get("/", (req, res) => {});

// récupère les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.get("/:user_id", (req, res) => {});

// récupère les parties d'un utilisateur spécifique
usersRoutes.get("/:user_id/games", (req, res) => {});

// récupères les messages d'un utilisateur spécifique
usersRoutes.get("/:user_id/messages", (req, res) => {});

// enregistre un nouvel utilisateur
usersRoutes.post("/", (req, res) => {});

// met à jour les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.put("/:user_id", (req, res) => {});

// supprime un utilisateur (droits admins, ou l'utilisateur lui-même)
usersRoutes.delete("/:user_id", (req, res) => {});

export default usersRoutes;
