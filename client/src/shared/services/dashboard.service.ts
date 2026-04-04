import api from "./api.service";

const dashboardService = {
	getDashboardData: async () => {
		try {
			const response = await api.get(`/`);
			return response.data;
		} catch (error: any) {
			throw error;
		}
	},
};

export default dashboardService;
