const TOKEN_KEY = "sissa_token";
const USER_KEY = "sissa_user";

export const setToken = (token: string) => {
	if (!token || token === "undefined") return;
	localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_KEY);
};

export const setUser = (user: any) => {
	localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): any | null => {
	const user = localStorage.getItem(USER_KEY);
	if (!user) return null;
	const parsedUser = JSON.parse(user);
	return parsedUser;
};

export const clearAuth = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
	const token = getToken();
	return !!token && token !== "undefined";
};
