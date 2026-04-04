import api from "./api.service";

const settingsService = {
	getSettings: async () => {
		const response = await api.get(`/settings`);
		return response.data;
	},
	updateSettings: async (settings: any) => {
		try {
			const response = await api.put(`/settings`, settings);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},
};

export default settingsService;
