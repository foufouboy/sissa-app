/**
 * - Récupérer toutes les parties d'un utilisateur
 * - Récupérer une partie d'un utilisateur
 * - Supprimer une partie d'un utilisateur
 * (- Récupérer des données statistiques d'une partie utilisateur, pour le dashboard)
 */

import { GameModel } from "../models/games.model";

export const gamesService = {
  async getStudentsOfTeacher(teacherId: number) {
    try {
      const students = await UserGroupsModel.findStudentsOfTeacher(teacherId);
      return students;
    } catch (error) {
      console.error("Erreur gamesService.getStudentsOfTeacher:", error);
      throw error;
    }
  },
  async getGamesOfUser(userId: number) {
    try {
      const games = await GameModel.findAllGamesOfPlayer(userId);
      return games;
    } catch (error) {
      console.error("Erreur gamesService.getGamesOfUser:", error);
      throw error;
    }
  },

  async getGameDetail(gameId: number) {
    try {
      const game = await GameModel.findById(gameId);
      return game;
    } catch (error) {
      console.error("Erreur gamesService.getGameDetail:", error);
      throw error;
    }
  },

  async deleteGame(gameId: number) {
    try {
      await GameModel.delete(gameId);
    } catch (error) {
      console.error("Erreur gamesService.deleteGame:", error);
      throw error;
    }
  },

  // On verra pour la fonction stats plus tard
};
