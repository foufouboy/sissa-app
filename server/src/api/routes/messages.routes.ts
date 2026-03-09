import { Router } from "express";
import { messagesController } from "../controllers/messages.controller";
import { authMiddleware as auth } from "../middlewares/auth";
import {
  handleValidationErrors,
  validationMiddleware as validation,
} from "../middlewares/validation";

const messagesRoutes = Router();

// récupère un message spécifique, SANS les données users-specifics liées
messagesRoutes.get("/:message_id", auth.isUser, messagesController.getOne);

// enregistre un nouveau message
// TODO: prendre un smtp pour les mails
messagesRoutes.post(
  "/",
  auth.isAdmin,
  validation.message,
  handleValidationErrors,
  messagesController.create,
);

// on ne peut ni modifier, ni supprimer un message. Éwi

export default messagesRoutes;
