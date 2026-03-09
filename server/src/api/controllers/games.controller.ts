import type { Request, Response } from "express";
import { gamesService } from "../../services/games.service";

export const gamesController = {
  async list(req: Request, res: Response) {
    try {
      const userId = Number(req.params.user_id || req.user?.id);
      const games = await gamesService.getGamesOfUser(userId);
      return res.status(200).json(games);
    } catch (error) {
      console.error("Erreur gamesController.list:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { pgn, whitePlayer, blackPlayer, result, event, gameDate, userId } =
        req.body;

      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      await gamesService.createGame({
        pgn,
        whitePlayer,
        blackPlayer,
        result,
        event,
        gameDate,
        userId: req.user.id,
      });

      return res.status(201).json({ message: "Partie créée avec succès" });
    } catch (error) {
      console.error("Erreur gamesController.create:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const gameId = Number(req.params.game_id);
      const game = await gamesService.getGameDetail(gameId);
      return res.status(200).json(game);
    } catch (error) {
      console.error("Erreur gamesController.getOne:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const gameId = Number(req.params.game_id);
      await gamesService.deleteGame(gameId);

      return res.status(200).json({ message: "Partie supprimée avec succès" });
    } catch (error) {
      console.error("Erreur gamesController.remove:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
