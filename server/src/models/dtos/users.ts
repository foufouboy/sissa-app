import { PrivateUser, PublicUser } from "../../types/users";

export const toPublicUser = (u: PrivateUser): PublicUser => {
    return {
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        role: u.role,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
    }
}

export const toPublicUsers = (users: PrivateUser[]): PublicUser[] => {
    return users.map(u => toPublicUser(u));
}