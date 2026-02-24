import {
	UserWithGroupsPrivate,
	UserWithGroupsPublic,
} from "../../types/userGroups";

export const toPublicUserWithGroups = (
	u: UserWithGroupsPrivate,
): UserWithGroupsPublic => {
	return {
		id: u.id,
		email: u.email,
		firstName: u.first_name,
		lastName: u.last_name,
		role: u.role,
		createdAt: u.created_at,
		updatedAt: u.updated_at,
		groups: u.groups,
	};
};

export const toPublicUsersWithGroups = (
	users: UserWithGroupsPrivate[],
): UserWithGroupsPublic[] => {
	return users.map((u) => toPublicUserWithGroups(u));
};
