import dashboard from "./dashboard.service";
import settings from "./settings.service";
import games from "./games.service";

const loaders = {
	getDashboardData: async () => {
		const data = await dashboard.getDashboardData();
		return { records: data };
	},

	getSettings: async () => {
		try {
			const data = await settings.getSettings();
			return {
				settings: data?.preferences ?? {
					darkMode: false,
					notifications: true,
					language: "fr",
				},
			};
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
		const data = await games.getOwnGames();
		return { games: data };
	},
};

export default loaders;
