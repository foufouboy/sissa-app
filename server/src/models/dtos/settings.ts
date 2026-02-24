import { SettingPrivate, SettingPublic } from "../../types/settings";

export const toPublicSetting = (s: SettingPrivate): SettingPublic => {
	return {
		id: s.id,
		userId: s.user_id,
		preferences: s.preferences,
		createdAt: s.created_at,
		updatedAt: s.updated_at,
	};
};

export const toPublicSettings = (
	settings: SettingPrivate[],
): SettingPublic[] => {
	return settings.map((s) => toPublicSetting(s));
};
