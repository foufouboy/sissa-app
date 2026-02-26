import { Router } from "express";
import { messagesController } from "../controllers/messages.controller";

const messagesRoutes = Router();

// récupère un message spécifique
messagesRoutes.get("/:message_id", messagesController.getOne);

// enregistre un nouveau message
messagesRoutes.post("/", messagesController.create);

// on ne peut ni modifier, ni supprimer un message. Éwi

export default messagesRoutes;
