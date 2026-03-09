import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { gamesService } from "../../services/games.service";
import { Roles } from "../../types/roles";
import { AuthenticatedUser } from "../../types/users";

// Extension du type Request pour utiliser l'utilisateur authentifié
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// Helper subordonné à requireAuth
function verifyAndExtractUser(req: Request): AuthenticatedUser | null {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET non configuré");
    }

    const decoded = jwt.verify(token, secret) as any;

    console.log("decoded", decoded);
    return {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

// Fonction principale pour vérifier si l'utilisateur est authentifié
function requireAuth(req: Request, res: Response): AuthenticatedUser | null {
  const user = verifyAndExtractUser(req);

  if (!user) {
    res.status(401).json({ message: "Token manquant ou invalide" });
    return null;
  }

  req.user = user;
  return user;
}

export const authMiddleware = {
  isConnected(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    next();
  },

  isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    if (user.role !== Roles.Admin) {
      return res
        .status(403)
        .json({ message: "Accès réservé aux administrateurs" });
    }

    next();
  },

  isTeacher(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    if (user.role !== Roles.Teacher) {
      return res.status(403).json({ message: "Accès réservé aux entraîneurs" });
    }

    next();
  },

  async isUserOrTeacherOf(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    const userId = Number(req.params.user_id);

    if (user.id == userId) {
      return next();
    }

    if (user.role === Roles.Teacher) {
      console.log("here");
      try {
        const students = await gamesService.getStudentsOfTeacher(user.id);
        console.log("students", students);
        if (students.some((student) => student.id == userId)) {
          return next();
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la vérification" });
      }
    }

    return res.status(403).json({ message: "Accès non autorisé" });
  },

  isUser(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    const userId = Number(req.params.user_id);

    if (user.id != userId) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    next();
  },

  isUserOrAdmin(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    const userId = Number(req.params.user_id);
    console.log("userId", userId);
    console.log("user.id", user.id);
    console.log("user.role", user.role);

    if (user.role !== Roles.Admin && user.id != userId) {
      console.log(user.id === userId);
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    next();
  },

  async isOwnerOfGame(req: Request, res: Response, next: NextFunction) {
    const user = requireAuth(req, res);
    if (!user) return;

    const gameId = Number(req.params.game_id);

    try {
      const game = await gamesService.getGameDetail(gameId);

      if (!game) {
        return res.status(404).json({ message: "Partie non trouvée" });
      }

      if (game.userId === user.id) {
        return next();
      }

      if (user.role === Roles.Teacher) {
        const students = await gamesService.getStudentsOfTeacher(user.id);
        if (students.some((s) => s.id === game.userId)) {
          return next();
        }
      }

      return res.status(403).json({ message: "Accès non autorisé" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification" });
    }
  },
};

export default authMiddleware;
