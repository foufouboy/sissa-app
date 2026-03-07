/**
 * SettingModel.findByUserId(id: string);
 * SettingModel.create(data: CreateSettingInput);
 * SettingModel.update(data: CreateSettingInput);
 * SettingModel.delete(id: string);
 */
import { CreateSettingInput, PrivateSetting } from "../types/settings";
import { query } from "../config/db";

export const SettingModel = {
	async findByUserId(userId: number): Promise<PrivateSetting> {
		try {
			const result = await query<PrivateSetting>(
				`SELECT * FROM settings WHERE user_id = $1`,
				[userId],
			);
			const setting = result[0];

			if (!setting) {
				throw new Error("Paramètres non trouvés");
			}

			return setting;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des paramètres:",
				error,
			);
			throw error;
		}
	},

	async create(data: CreateSettingInput): Promise<PrivateSetting> {
		try {
			const { userId, preferences } = data;
			const result = await query<PrivateSetting>(
				`INSERT INTO settings (user_id, preferences) VALUES ($1, $2) RETURNING *`,
				[userId, preferences],
			);

			const setting = result[0];
			if (!setting) {
				throw new Error("Erreur lors de la création des paramètres");
			}

			return setting;
		} catch (error) {
			console.error("Erreur lors de la création des paramètres:", error);
			throw error;
		}
	},

	async update(data: CreateSettingInput): Promise<PrivateSetting> {
		try {
			const { userId, preferences } = data;
			const result = await query<PrivateSetting>(
				`UPDATE settings SET preferences = $1 WHERE user_id = $2 RETURNING *`,
				[preferences, userId],
			);

			const setting = result[0];
			if (!setting) {
				throw new Error(
					"Erreur lors de la mise à jour des paramètres",
				);
			}

			return setting;
		} catch (error) {
			console.error(
				"Erreur lors de la mise à jour des paramètres:",
				error,
			);
			throw error;
		}
	},

	async delete(userId: number): Promise<void> {
		try {
			await query<PrivateSetting>(
				`DELETE FROM settings WHERE user_id = $1`,
				[userId],
			);
		} catch (error) {
			console.error(
				"Erreur lors de la suppression des paramètres:",
				error,
			);
			throw error;
		}
	},
};

// TESTS

async function main() {
	const settings = await SettingModel.update({
		userId: 1,
		preferences: {
			theme: "light",
			language: "en",
			notifications: true,
			email: true,
		},
	});
	console.log(settings);
}
