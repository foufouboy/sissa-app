import settingsService from "./settings.service";
import gamesService from "./games.service";
import type { ActionFunctionArgs } from "react-router";

const actions = {
	createGame: async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();

			const response = await gamesService.createGame({
				pgn: formData.get("pgn") as string,
				whitePlayer: formData.get("whitePlayer") as string,
				blackPlayer: formData.get("blackPlayer") as string,
				result: formData.get("result") as string,
				event: formData.get("event") as string,
				gameDate: formData.get("gameDate") as string,
			});

			if (response?.error) {
				throw new Error(response.error);
			}

			return { message: "Partie créée avec succès !", game: response };
		} catch (error: any) {
			console.log(error);
			if (error.response.data.errors) {
				return { error: "Un ou plusieurs champs sont invalides" };
			}
			return { error: "Erreur lors de la création de la partie" };
		}
	},

	deleteGame: async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();
			const gameId = formData.get("gameId") as string;

			if (!gameId) {
				return { error: "Identifiant de partie manquant" };
			}

			const response = await gamesService.deleteGame(gameId);

			if (response?.error) {
				return { error: "Erreur lors de la suppression de la partie" };
			}

			return { message: "Partie supprimée avec succès !" };
		} catch {
			return { error: "Erreur lors de la suppression de la partie" };
		}
	},

	updateGamePgn: async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();
			const gameId = formData.get("gameId") as string;
			const pgn = formData.get("pgn") as string;

			if (!gameId || !pgn) {
				return { error: "Données manquantes" };
			}

			const response = await gamesService.updateGame(gameId, { pgn });

			if (response?.error) {
				return { error: "Erreur lors de la mise à jour de la partie" };
			}

			return { message: "PGN mis à jour avec succès !" };
		} catch {
			return { error: "Erreur lors de la mise à jour de la partie" };
		}
	},

	gamesAction: async (args: ActionFunctionArgs) => {
		const formData = await args.request.clone().formData();
		const intent = formData.get("_intent");

		if (intent === "create") return actions.createGame(args);
		if (intent === "delete") return actions.deleteGame(args);
		if (intent === "updatePgn") return actions.updateGamePgn(args);

		return { error: "Action inconnue" };
	},

	updateSettings: async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();

			const settings = {
				notifications: formData.get("notifications") === "true",
				darkMode: formData.get("darkMode") === "true",
				language: formData.get("language"),
			};
			console.log(settings, "actions");

			const response = await settingsService.updateSettings(settings);

			if (response.error) {
				console.log("Erreur dans les actions");
				return { error: response.error };
			}
			return { message: "Paramètres mis à jour avec succès !" };
		} catch (error: any) {
			console.log(error.response);
			return { error: error.data.errors };
		}
	},
};

export default actions;
