import { Router } from "express";
import { usersController } from "../controllers/users.controller";

const usersRoutes = Router();

// récupère tous les utilisateurs pour la page de management (droits admins)
usersRoutes.get("/", usersController.list);

// récupère les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.get("/:user_id", usersController.getOne);

// récupère les parties d'un utilisateur spécifique
usersRoutes.get("/:user_id/games", usersController.getGames);

// récupères les messages d'un utilisateur spécifique
usersRoutes.get("/:user_id/messages", usersController.getMessages);

// met à jour les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.put("/:user_id", usersController.update);

// supprime un utilisateur (droits admins, ou l'utilisateur lui-même)
usersRoutes.delete("/:user_id", usersController.remove);

export default usersRoutes;
