import dashboard from "./dashboard.service";
import settings from "./settings.service";
import games from "./games.service";
import members from "./members.service";
import { withDelay } from "@/shared/utils/utils";

const loaders = {
	getDashboardData: async () => {
		const data = await withDelay(dashboard.getDashboardData());
		return { records: data };
	},

	getSettings: async () => {
		try {
			const data = await settings.getSettings();

			if (!data || !data.preferences) {
				throw new Error("Données invalides");
			}

			return { settings: data.preferences };
		} catch {
			return {
				settings: {
					darkMode: false,
					notifications: true,
					language: "fr",
				},
			};
		}
	},

	getOwnGames: async () => {
		const data = await withDelay(games.getOwnGames());
		return { games: data };
	},

	getMembers: async () => {
		const data = await withDelay(members.getAll());
		return { members: data };
	},
};

export default loaders;
