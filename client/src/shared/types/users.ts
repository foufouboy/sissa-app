export interface AuthenticatedUser {
	id: string;
	email: string;
	fullName: string;
	role: "member" | "teacher" | "admin";
}
