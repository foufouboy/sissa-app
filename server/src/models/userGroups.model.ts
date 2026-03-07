/**
 * UserGroupsModel.findAllUsers();
 * UserGroupsModel.findUserById(id: number);
 * UserGroupsModel.create(data: CreateUserWithGroupsInput);
 * UserGroupsModel.update(data: CreateUserWithGroupsInput);
 */

import { query } from "../config/db";
import {
	PrivateUserWithGroups,
	CreateUserWithGroupsInput,
} from "../types/userGroups";

export const UserGroupsModel = {
	async findAllUsers(): Promise<PrivateUserWithGroups[]> {
		try {
			const result = await query<PrivateUserWithGroups>(
				`SELECT * FROM users_with_groups`,
			);
			return result;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des utilisateurs avec leurs groupes:",
				error,
			);
			throw error;
		}
	},

	async findUsersByGroup(id: number): Promise<PrivateUserWithGroups[]> {
		try {
			const result = await query<PrivateUserWithGroups>(
				`SELECT * FROM users_with_groups
                    WHERE groups @> jsonb_build_array(
                    jsonb_build_object('id', $1::int)
                );`,
				[id],
			);

			return result;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération du groupe d'utilisateur:",
				error,
			);
			throw error;
		}
	},

	async findUserById(id: number): Promise<PrivateUserWithGroups> {
		try {
			const result = await query<PrivateUserWithGroups>(
				`SELECT * FROM users_with_groups WHERE id = $1`,
				[id],
			);
			if (!result[0]) {
				throw new Error("Utilisateur non trouvé");
			}
			return result[0];
		} catch (error) {
			console.error(
				"Erreur lors de la récupération de l'utilisateur avec ses groupes:",
				error,
			);
			throw error;
		}
	},

	async create(data: CreateUserWithGroupsInput): Promise<void> {
		try {
			const { userId, groupIds } = data;

			await query(
				`
                    INSERT INTO users_members_groups (user_id, member_group_id)
                    SELECT
                        $1,
                        UNNEST($2::int[]);
                `,
				[userId, groupIds],
			);
		} catch (error) {
			console.error(
				"Erreur lors de la création des groupes de l'utilisateur:",
				error,
			);
		}
	},

	async update(data: CreateUserWithGroupsInput): Promise<void> {
		try {
			const { userId, groupIds } = data;

			await query("BEGIN");

			await query(`DELETE FROM users_members_groups WHERE user_id = $1`, [
				userId,
			]);

			await query(
				`
                INSERT INTO users_members_groups (user_id, member_group_id)
                SELECT $1, UNNEST($2::int[])
                `,
				[userId, groupIds],
			);

			await query("COMMIT");
		} catch (error) {
			await query("ROLLBACK");
			throw error;
		}
	},
};
