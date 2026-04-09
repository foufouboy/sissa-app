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

	getGroups: async () => {
		try {
			const response = await api.get("/groups/");
			return response.data;
		} catch (error: any) {
			console.error(error.response);
			return { error: error.response };
		}
	},

	updateMemberGroups: async (userId: string, groupIds: number[]) => {
		try {
			const response = await api.put(`/users/${userId}/groups`, {
				groupIds,
			});
			return response.data;
		} catch (error: any) {
			console.error(error.response);
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
