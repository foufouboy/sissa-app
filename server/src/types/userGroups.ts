import { PrivateUser, PublicUser } from "./users";

interface Group {
	id: number;
	name: string;
}

export type PrivateUserWithGroups = PrivateUser & {
	groups: Group[];
};

export type PublicUserWithGroups = PublicUser & {
	groups: Group[];
};

export interface CreateUserWithGroupsInput {
	userId: number;
	groupIds: number[];
}
