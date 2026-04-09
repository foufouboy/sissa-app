import { GroupModel } from "../models/groups.model";
import { Group } from "../types/groups";

export const groupsService = {
	async getAllGroups(): Promise<Group[]> {
		try {
			return await GroupModel.findAll();
		} catch (error) {
			console.error("Erreur groupsService.getAllGroups:", error);
			throw error;
		}
	},
};
