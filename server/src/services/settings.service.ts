import { SettingModel } from "../models/settings.model";
import type { CreateSettingInput, PublicSetting } from "../types/settings";
import { toPublicSetting } from "../models/dtos/settings";

export const settingsService = {
	async getSettingsForUser(userId: number): Promise<PublicSetting> {
		const setting = await SettingModel.findByUserId(userId);
		return toPublicSetting(setting);
	},

	async updateSettingsForUser(
		data: CreateSettingInput,
	): Promise<PublicSetting> {
		const updated = await SettingModel.update(data);
		return toPublicSetting(updated);
	},

	async createSettingsForUser(
		data: CreateSettingInput,
	): Promise<PublicSetting> {
		const created = await SettingModel.create(data);
		return toPublicSetting(created);
	},
};

