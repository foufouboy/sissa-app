import type { Request, Response } from "express";
import { authService } from "../../services/auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      res.status(201).json({
        message: "Utilisateur authentifié avec succès",
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  async logout(req: Request, res: Response) {
    return res.status(200).json({
      message:
        "Déconnecter l'utilisateur en invalidant son JWT côté client (par ex. suppression du cookie/token).",
    });
  },

  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const user = await authService.register({
        email,
        password,
        firstName,
        lastName,
      });

      res.status(201).json({
        message: "Utilisateur enregistré avec succès",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  },
};
