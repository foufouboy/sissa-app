import { Roles } from "./roles";

export interface PrivateUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	role: Roles;
	created_at: Date;
	updated_at: Date;
}

export type CreateUserInput = Pick<
	PublicUser,
	"email" | "firstName" | "lastName" | "role"
> & { password: string };

export interface PublicUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: Roles;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthenticatedUser {
	id: number;
	email: string;
	role: Roles;
}
