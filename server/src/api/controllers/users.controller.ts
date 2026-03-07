import type { Request, Response } from "express";
import { usersService } from "../../services/users.service";
import { gamesService } from "../../services/games.service";
import { messagesService } from "../../services/messages.service";

export const usersController = {
	async list(req: Request, res: Response) {
		try {
			// Pagination à implémenter
			const users = await usersService.getAllUsers();
			return res.status(200).json(users);
		} catch (error) {
			console.error("Erreur usersController.list:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async getOne(req: Request, res: Response) {
		try {
			const userId = Number(req.params.user_id);

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre user_id invalide" });
			}

			const user = await usersService.getProfileDetails(userId);
			return res.status(200).json(user);
		} catch (error) {
			console.error("Erreur usersController.getOne:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async getGames(req: Request, res: Response) {
		try {
			const userId = Number(req.params.user_id);

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre user_id invalide" });
			}

			const games = await gamesService.getGamesOfUser(userId);
			return res.status(200).json(games);
		} catch (error) {
			console.error("Erreur usersController.getGames:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async getMessages(req: Request, res: Response) {
		try {
			const userId = Number(req.params.user_id);

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre user_id invalide" });
			}

			const messages = await messagesService.getAllFromUser(userId);
			return res.status(200).json(messages);
		} catch (error) {
			console.error("Erreur usersController.getMessages:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const { email, password, firstName, lastName, role } = req.body;

			if (!email || !password || !firstName || !lastName) {
				return res.status(400).json({
					message:
						"Champs requis manquants (email, password, firstName, lastName)",
				});
			}

			const user = await usersService.createNewUser({
				email,
				password,
				firstName,
				lastName,
				role,
			});

			return res.status(201).json(user);
		} catch (error) {
			console.error("Erreur usersController.create:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const userId = Number(req.params.user_id);
			const { email, firstName, lastName, role, password } = req.body;

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre user_id invalide" });
			}

			await usersService.updateProfile(userId, {
				email,
				password,
				firstName,
				lastName,
				role,
			});

			return res
				.status(200)
				.json({ message: "Utilisateur mis à jour avec succès" });
		} catch (error) {
			console.error("Erreur usersController.update:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const userId = Number(req.params.user_id);

			if (!userId || Number.isNaN(userId)) {
				return res
					.status(400)
					.json({ message: "Paramètre user_id invalide" });
			}

			await usersService.deleteUser(userId);

			return res
				.status(200)
				.json({ message: "Utilisateur supprimé avec succès" });
		} catch (error) {
			console.error("Erreur usersController.remove:", error);
			return res.status(500).json({ message: "Erreur serveur" });
		}
	},
};
