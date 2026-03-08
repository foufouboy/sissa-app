import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authMiddleware as auth } from "../middlewares/auth";

const usersRoutes = Router();

// récupère tous les utilisateurs pour la page de management (droits admins)
usersRoutes.get("/", auth.isAdmin, usersController.list);

// récupère les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.get("/:user_id", auth.isAdminOrSelf, usersController.getOne);

// récupère les parties d'un utilisateur spécifique
usersRoutes.get(
	"/:user_id/games",
	auth.isUserOrTeacherOf,
	usersController.getGames,
);

// récupères les messages d'un utilisateur spécifique
usersRoutes.get("/:user_id/messages", auth.isUser, usersController.getMessages);

// met à jour les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
// devra plus tard seulement permettre aux admins de changer les groupes, et pas le reste
usersRoutes.put("/:user_id", auth.isAdminOrSelf, usersController.update);

// supprime un utilisateur (droits admins, ou l'utilisateur lui-même)
usersRoutes.delete("/:user_id", auth.isAdminOrSelf, usersController.remove);

export default usersRoutes;
