export interface AuthenticatedUser {
	id: string;
	email: string;
	role: "member" | "teacher" | "admin";
}
