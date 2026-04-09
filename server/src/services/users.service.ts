/**
 * PROFIL
 * - Récupérer les détails d'un profil
 * - Créer un nouvel utilisateur
 * - Modifier un profil complet
 * - Supprimer un utilisateur
 *
 * MANAGEMENT
 * - Changer un/les groupes d'un utilisateur
 * - Récupérer la liste de tous les utilisateurs d'un groupe
 * - de tous les utilisateurs (pagination)
 *
 *
 */

import { UserModel } from "../models/users.model";
import { CreateUserInput, PublicUser } from "../types/users";
import { toPublicUser, toPublicUsers } from "../models/dtos/users";
import {
	CreateUserWithGroupsInput,
	PublicUserWithGroups,
} from "../types/userGroups";
import { UserGroupsModel } from "../models/userGroups.model";
import { toPublicUserWithGroups, toPublicUsersWithGroups } from "../models/dtos/userGroups";

export const usersService = {
	// PROFILE

	async getProfileDetails(userId: number): Promise<PublicUser> {
		try {
			const user = await UserModel.findById(userId);
			if (!user) {
				throw new Error("Utilisateur non trouvé");
			}
			return toPublicUser(user);
		} catch (error) {
			console.error("Erreur usersService.getProfileDetails:", error);
			throw error;
		}
	},

	async createUser(data: CreateUserInput): Promise<PublicUser> {
		try {
			const user = await UserModel.create(data);
			return toPublicUser(user);
		} catch (error) {
			console.error("Erreur usersService.createUser:", error);
			throw error;
		}
	},

	async updateProfile(userId: number, data: CreateUserInput) {
		try {
			await UserModel.updateById(userId, data);
			return true;
		} catch (error) {
			console.error("Erreur usersService.updateProfile:", error);
			throw error;
		}
	},

	async deleteUser(userId: number) {
		try {
			await UserModel.delete(userId);
			return true;
		} catch (error) {
			console.error("Erreur usersService.deleteUser:", error);
			throw error;
		}
	},

	// MANAGEMENT

	async getUserWithGroups(userId: number): Promise<PublicUserWithGroups> {
		try {
			const user = await UserGroupsModel.findUserById(userId);
			return toPublicUserWithGroups(user);
		} catch (error) {
			console.error("Erreur usersService.getUserWithGroups:", error);
			throw error;
		}
	},

	async updateGroupsOfUser(data: CreateUserWithGroupsInput) {
		try {
			await UserGroupsModel.update(data);
			return true;
		} catch (error) {
			console.error("Erreur usersService.updateGroupsOfUser:", error);
			throw error;
		}
	},

	async getUsersOfGroup(groupId: number): Promise<PublicUserWithGroups[]> {
		try {
			const users = await UserGroupsModel.findUsersByGroup(groupId);
			return toPublicUsersWithGroups(users);
		} catch (error) {
			console.error("Erreur usersService.getUsersOfGroup:", error);
			throw error;
		}
	},

	async getAllUsersWithGroups(): Promise<PublicUserWithGroups[]> {
		try {
			const users = await UserGroupsModel.findAllUsers();
			return toPublicUsersWithGroups(users);
		} catch (error) {
			console.error("Erreur usersService.getAllUsersWithGroups:", error);
			throw error;
		}
	},

	async getAllUsers(): Promise<PublicUser[]> {
		try {
			const users = await UserModel.findAll();
			return toPublicUsers(users);
		} catch (error) {
			console.error("Erreur usersService.getAllUsers:", error);
			throw error;
		}
	},
};
