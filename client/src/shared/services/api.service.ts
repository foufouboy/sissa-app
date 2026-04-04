import axios from "axios";
import { clearAuth, getToken } from "../utils/auth";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		const data = error?.response?.data;
		const code = data?.code;

		const isAuthError = status === 401 && code === "INVALID_TOKEN";

		if (isAuthError) {
			clearAuth();
			window.location.assign("/auth/login");
		}

		return Promise.reject(error);
	},
);

export default api;
