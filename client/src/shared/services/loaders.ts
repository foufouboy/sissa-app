import dashboard from "./dashboard.service";
import settings from "./settings.service";
import games from "./games.service";
import members from "./members.service";
import { withDelay } from "@/shared/utils/utils";

// Loaders pour le système de fetching des données via React Router

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
		const user = JSON.parse(localStorage.getItem("sissa_user") ?? "null");
		console.log(user);
		if (user?.role !== "Administrateur" && user?.role !== "admin") {
			throw new Response("Forbidden", { status: 403 });
		}
		const [membersData, groupsData] = await withDelay(
			Promise.all([members.getAll(), members.getGroups()]),
		);
		return { members: membersData, availableGroups: groupsData };
	},

	notFound: () => {
		throw new Response("Not Found", { status: 404 });
	},
};

export default loaders;
