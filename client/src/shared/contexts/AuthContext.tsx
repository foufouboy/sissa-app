import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import {
	getToken,
	setToken,
	getUser,
	setUser,
	clearAuth,
	isAuthenticated,
} from "../utils/auth";

interface AuthContextType {
	user: any | null;
	login: (email: string, password: string) => Promise<void>;
	register: (
		email: string,
		password: string,
		confirmPassword: string,
		firstName: string,
		lastName: string,
	) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUserState] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = getToken();
		const user = getUser();

		if (token && user) {
			console.log("user found");
			setUserState(user);
		}

		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		const result = await authService.login(email, password);

		if (!result?.token || !result?.user) {
			throw new Error("Réponse invalide du serveur");
		}

		setToken(result.token);
		setUser(result.user);
		setUserState(result.user);
	};

	const register = async (
		email: string,
		password: string,
		confirmPassword: string,
		firstName: string,
		lastName: string,
	) => {
		const result = await authService.register(
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
		);

		setToken(result.token);
		setUserState(result.user);
	};

	const logout = () => {
		clearAuth();
		setUserState(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				isAuthenticated: isAuthenticated(),
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth doit être utilisé dans un AuthProvider");
	}

	return context;
}
