import { Roles } from "./roles";

// Importants, car ce sont les entités sur lesquels on va se reposer
// pour notre logique métier

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: Roles;
    created_at: Date;
    updated_at: Date;
}

export type CreateUserInput = Pick<User, "email" | "password" | "first_name" | "last_name" | "role">;

export interface UserPublic {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
    createdAt: Date;
    updatedAt: Date;
}