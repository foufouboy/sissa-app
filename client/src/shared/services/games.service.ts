import api from "./api.service";

function extractError(error: any): string {
	return (
		error?.response?.data?.message ??
		error?.response?.data?.error ??
		"Une erreur est survenue"
	);
}

const gamesService = {
	getOwnGames: async () => {
		try {
			const response = await api.get(`/games/`);
			return response.data;
		} catch (error: any) {
			return { error: extractError(error) };
		}
	},

	createGame: async (gameData: any) => {
		try {
			const response = await api.post(`/games/`, gameData);
			return response.data;
		} catch (error: any) {
			return { error: extractError(error) };
		}
	},

	updateGame: async (gameId: string, gameData: any) => {
		try {
			const response = await api.put(`/games/${gameId}`, gameData);
			return response.data;
		} catch (error: any) {
			return { error: extractError(error) };
		}
	},

	deleteGame: async (gameId: string) => {
		try {
			const response = await api.delete(`/games/${gameId}`);
			return response.data;
		} catch (error: any) {
			return { error: extractError(error) };
		}
	},
};

export default gamesService;
