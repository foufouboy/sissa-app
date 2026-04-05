import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UserModel } from "../../models/users.model";
import { isValidPgn } from "../../utils/utils";

export const handleValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export const validationMiddleware = {
	user: [
		body("email").isEmail().withMessage("Email invalide"),
		body("email").custom(async (value, { req }) => {
			const user = await UserModel.findByEmail(value);
			if (user && user.id !== Number(req?.params?.user_id)) {
				throw new Error("Email déjà utilisé");
			}
			return true;
		}),

		body("password")
			.isLength({ min: 8 })
			.withMessage("Mot de passe trop court (minimum 8 caractères)"),

		body("confirmPassword").custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Les mots de passe ne correspondent pas");
			}
			return true;
		}),

		body("firstName")
			.isString()
			.withMessage("Prénom invalide")
			.isLength({ min: 2 })
			.withMessage("Prénom trop court (minimum 2 caractères)"),

		body("lastName")
			.isString()
			.withMessage("Nom invalide")
			.isLength({ min: 2 })
			.withMessage("Nom trop court (minimum 2 caractères)"),
	],
	// un pgn doit être valide
	game: [
		body("pgn").custom(async (value) => {
			if (!isValidPgn(value)) {
				throw new Error("Pgn invalide");
			}
			return true;
		}),
		body("whitePlayer")
			.isString()
			.withMessage("Joueur blanc invalide")
			.isLength({ min: 2 })
			.withMessage("Joueur blanc trop court (minimum 2 caractères)"),
		body("blackPlayer")
			.isString()
			.withMessage("Joueur noir invalide")
			.isLength({ min: 2 })
			.withMessage("Joueur noir trop court (minimum 2 caractères)"),
		body("result")
			.isIn(["1-0", "0-1", "1/2-1/2"])
			.withMessage("Résultat invalide"),
		body("event")
			.isString()
			.withMessage("Évènement invalide")
			.isLength({ min: 3 })
			.withMessage("Évènement trop court (minimum 3 caractères)"),
		body("gameDate").isDate().withMessage("Date de la partie invalide"),
	],
	// un évènement ne peut pas être dans le passé
	// le jour de début de l'évènement ne peut pas être après le jour de fin de l'évènement
	event: [
		body("title")
			.isString()
			.withMessage("Titre invalide")
			.isLength({ min: 5 })
			.withMessage("Titre trop court (minimum 3 caractères)"),

		body("description")
			.isString()
			.withMessage("Description invalide")
			.isLength({ min: 10 })
			.withMessage("Description trop courte (minimum 10 caractères)"),

		body("allDay").isBoolean().withMessage("Journée entière invalide"),

		body("location")
			.isString()
			.withMessage("Lieu invalide")
			.isLength({ min: 3 })
			.withMessage("Lieu trop court (minimum 5 caractères)"),

		body("startDate")
			.isDate()
			.withMessage("Date de début invalide")
			.custom(async (value) => {
				const startDate = new Date(value);
				if (startDate < new Date()) {
					throw new Error(
						"La date de début ne peut pas être dans le passé",
					);
				}
				return true;
			}),
		body("endDate")
			.isDate()
			.withMessage("Date de fin invalide")
			.custom(async (value, { req }) => {
				const startDate = new Date(req.body.startDate);
				const endDate = new Date(value);

				if (endDate < startDate) {
					throw new Error(
						"La date de fin ne peut pas être avant la date de début",
					);
				}
				return true;
			}),
		body("memberGroupsIds")
			.isArray()
			.withMessage("Liste de groupes invalide"),
	],
	message: [
		body("subject")
			.isString()
			.withMessage("Sujet invalide")
			.isLength({ min: 5 })
			.withMessage("Sujet trop court (minimum 5 caractères)"),
		body("body")
			.isString()
			.withMessage("Corps du message invalide")
			.isLength({ min: 10 })
			.withMessage("Corps du message trop court (minimum 10 caractères)"),
		body("infoType")
			.isString()
			.withMessage("Type d'information invalide")
			.isLength({ min: 3 })
			.withMessage(
				"Type d'information trop court (minimum 3 caractères)",
			),
		body("messageType")
			.isIn(["notification", "email"])
			.withMessage("Type de message invalide"),
		body("userIds").isArray().withMessage("Liste d'utilisateurs invalide"),
	],
	settings: [
		body("notifications")
			.isBoolean()
			.withMessage("Notifications invalides"),
		body("darkMode").isBoolean().withMessage("Mode sombre invalide"),
		body("language").isIn(["en", "fr"]).withMessage("Langue invalide"),
	],
};
