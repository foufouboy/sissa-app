import api from "./api.service";

const membersService = {
	getAll: async () => {
		try {
			const response = await api.get("/users/with-groups/");
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},

	updateMember: async (userId: string, data: { groups?: string[] }) => {
		try {
			const response = await api.put(`/admin/users/${userId}`, data);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},

	deleteMember: async (userId: string) => {
		try {
			const response = await api.delete(`/users/${userId}`);
			return response.data;
		} catch (error: any) {
			return { error: error.response };
		}
	},
};

export default membersService;
