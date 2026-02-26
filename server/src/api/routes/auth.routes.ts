import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRoutes = Router();

// envoie le JWT au client après une authentification réussie
authRoutes.post("/login", authController.login);

// enregistre un nouvel utilisateur
authRoutes.post("/register", authController.register);

export default authRoutes;
