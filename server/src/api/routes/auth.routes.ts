import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRoutes = Router();

// envoie le JWT au client après une authentification réussie
// vérifier si l'utilisateur est déjà connecté ou non, via req.user !
// (si oui prévoir une route privée pour vider le req.user)
authRoutes.post("/login", authController.login);

// enregistre un nouvel utilisateur
authRoutes.post("/register", authController.register);

export default authRoutes;
