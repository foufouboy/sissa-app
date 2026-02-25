import { Router } from "express";

const settingsRoutes = Router();

// récupère les paramètres de l'utilisateur
settingsRoutes.get("/", (req, res) => {});

// met à jour les paramètres de l'utilisateur
settingsRoutes.put("/", (req, res) => {});

export default settingsRoutes;
