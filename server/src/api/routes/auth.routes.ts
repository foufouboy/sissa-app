import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import {
	validationMiddleware as validation,
	handleValidationErrors,
} from "../middlewares/validation";

const authRoutes = Router();

// envoie le JWT au client après une authentification réussie
// vérifier si l'utilisateur est déjà connecté ou non, via req.user !
// (si oui prévoir une route privée pour vider le req.user)

// il faudra voir si on met une validation d'user pour la connexion
authRoutes.post("/login", authController.login);

// enregistre un nouvel utilisateur
authRoutes.post(
	"/register",
	validation.user,
	handleValidationErrors,
	authController.register,
);

export default authRoutes;
