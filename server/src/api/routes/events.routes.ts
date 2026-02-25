import { Router } from "express";

const eventsRoutes = Router();

// récupère tous les évènements dont on a besoin
eventsRoutes.get("/", (req, res) => {});

// enregistre un nouvel évènement
eventsRoutes.post("/", (req, res) => {});

// récupère le détail d'un évènement spécifique
eventsRoutes.get("/:event_id", (req, res) => {});

// met à jour un évènement (droits admins)
eventsRoutes.put("/:event_id", (req, res) => {});

// supprime un évènement (droits admins)
eventsRoutes.delete("/:event_id", (req, res) => {});

export default eventsRoutes;
