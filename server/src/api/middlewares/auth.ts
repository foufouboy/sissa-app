import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AuthenticatedUser } from "../../types/users";
import { Roles } from "../../types/roles";
import { gamesService } from "../../services/games.service";

// Extension du type Request pour utiliser l'utilisateur authentifié
declare global {
	namespace Express {
		interface Request {
			user?: AuthenticatedUser;
		}
	}
}

// Fonction helper pour extraire et vérifier le token
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

// Helper pour requérir l'authentification et envoyer la réponse si nécessaire
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
			return res
				.status(403)
				.json({ message: "Accès réservé aux entraîneurs" });
		}

		next();
	},

	async isTeacherOf(req: Request, res: Response, next: NextFunction) {
		const user = requireAuth(req, res);
		if (!user) return;

		if (user.role !== Roles.Teacher) {
			return res
				.status(403)
				.json({ message: "Accès réservé aux entraîneurs" });
		}

		try {
			const studentId = Number(req.params.user_id);

			// Récupérer tous les étudiants du teacher
			const students = await gamesService.getStudentsOfTeacher(user.id);

			// Vérifier si l'étudiant demandé fait partie des étudiants du teacher
			const hasAccess = students.some(
				(student) => student.id === studentId,
			);

			if (!hasAccess) {
				return res
					.status(403)
					.json({ message: "Accès non autorisé à cet étudiant" });
			}

			next();
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Erreur lors de la vérification" });
		}
	},

	isUser(req: Request, res: Response, next: NextFunction) {
		const user = requireAuth(req, res);
		if (!user) return;

		const userId = Number(req.params.user_id);

		if (user.id !== userId) {
			return res.status(403).json({ message: "Accès non autorisé" });
		}

		next();
	},

	isAdminOrSelf(req: Request, res: Response, next: NextFunction) {
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

	async isUserOrTeacherOf(req: Request, res: Response, next: NextFunction) {
		const user = requireAuth(req, res);
		if (!user) return;

		const userId = Number(req.params.user_id);

		if (user.id === userId) {
			return next();
		}

		if (user.role === Roles.Teacher) {
			try {
				const students = await gamesService.getStudentsOfTeacher(
					user.id,
				);
				const hasAccess = students.some(
					(student) => student.id === userId,
				);

				if (hasAccess) {
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
};

export default authMiddleware;
