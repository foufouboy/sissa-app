const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
import api from "./api.service";

if (!API_ENDPOINT) {
	console.log("API_ENDPOINT is not set");
}

const authService = {
	login: async (email: string, password: string) => {
		try {
			const response = await api.post(`/auth/login`, {
				email,
				password,
			});
			return response.data;
		} catch (error: any) {
			console.log("here catch");
			throw new Error(
				error.response.data.message || "Erreur de connexion",
			);
		}
	},

	register: async (
		email: string,
		password: string,
		confirmPassword: string,
		firstName: string,
		lastName: string,
	) => {
		const response = await api.post(`/auth/register`, {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
		});

		return response.data;
	},
};

export default authService;
