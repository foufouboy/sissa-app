import { Router } from "express";
import { messagesController } from "../controllers/messages.controller";
import { authMiddleware as auth } from "../middlewares/auth";

const messagesRoutes = Router();

// récupère un message spécifique
messagesRoutes.get("/:message_id", auth.isUser, messagesController.getOne);

// enregistre un nouveau message
messagesRoutes.post("/", auth.isAdmin, messagesController.create);

// on ne peut ni modifier, ni supprimer un message. Éwi

export default messagesRoutes;
