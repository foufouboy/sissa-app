import { query } from "../config/db";
import { Group } from "../types/groups";

export const GroupModel = {
	async findAll(): Promise<Group[]> {
		try {
			const result = await query<Group>(`SELECT id, name FROM members_groups ORDER BY name`);
			return result;
		} catch (error) {
			console.error("Erreur lors de la récupération des groupes:", error);
			throw error;
		}
	},
};
