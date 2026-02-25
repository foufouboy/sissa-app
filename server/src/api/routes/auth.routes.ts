import { Router } from "express";

const authRoutes = Router();

// envoie le JWT au client après une authentification réussie
authRoutes.post("/login", (req, res) => {});

// retire le JWT du client pour le déconnecter
authRoutes.post("/logout", (req, res) => {});

// enregistre un nouvel utilisateur
authRoutes.post("/register", (req, res) => {});

export default authRoutes;
