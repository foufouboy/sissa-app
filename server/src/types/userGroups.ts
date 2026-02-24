import { User, UserPublic } from "./users";

interface Group {
	id: number;
	name: string;
}

export type UserWithGroupsPrivate = User & {
	groups: Group[];
};

export type UserWithGroupsPublic = UserPublic & {
	groups: Group[];
};

export interface CreateUserWithGroupsInput {
	userId: number;
	groupIds: number[];
}
