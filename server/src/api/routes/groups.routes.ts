import { Router } from "express";

const groupsRoutes = Router();

// récupère tous les utilisateurs appartenant à un groupe donné
groupsRoutes.get("/:group_id/users", (req, res) => {});

// récupère tous les messages appartenant à un groupe donné
groupsRoutes.get("/:group_id/messages", (requ, res) => {});

// récupère tous les events appartenant à un groupe donné
groupsRoutes.get("/:group_id/events", (requ, res) => {});

export default groupsRoutes;
