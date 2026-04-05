import api from "./api.service";

const gamesService = {
	getOwnGames: async () => {
		try {
			const response = await api.get(`/games/`);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},

	createGame: async (gameData: any) => {
		try {
			const response = await api.post(`/games/`, gameData);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},

	updateGame: async (gameId: string, gameData: any) => {
		try {
			const response = await api.put(`/games/${gameId}`, gameData);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},

	deleteGame: async (gameId: string) => {
		try {
			const response = await api.delete(`/games/${gameId}`);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},
};

export default gamesService;
