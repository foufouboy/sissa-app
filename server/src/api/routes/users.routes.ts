import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
  handleValidationErrors,
  validationMiddleware as validation,
} from "../middlewares/validation";

const usersRoutes = Router();

// récupère tous les utilisateurs pour la page de management (droits admins)
// TODO: pagination (priorité moyenne)
usersRoutes.get("/", auth.isAdmin, usersController.list);

// récupère les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
usersRoutes.get("/:user_id", auth.isUserOrAdmin, usersController.getOne);

// récupère les parties d'un utilisateur spécifique
usersRoutes.get(
  "/:user_id/games",
  auth.isUserOrTeacherOf,
  usersController.getGames,
);

// récupères les messages d'un utilisateur spécifique
usersRoutes.get("/:user_id/messages", auth.isUser, usersController.getMessages);

// met à jour les détails d'un utilisateur spécifique (droits admins, ou l'utilisateur lui-même)
// TODO: plus tard seulement permettre aux admins de changer les groupes, et pas le reste (priorité moyenne)
usersRoutes.put(
  "/:user_id",
  auth.isUserOrAdmin,
  validation.user,
  handleValidationErrors,
  usersController.update,
);

// supprime un utilisateur (droits admins, ou l'utilisateur lui-même)
usersRoutes.delete("/:user_id", auth.isUserOrAdmin, usersController.remove);

export default usersRoutes;
