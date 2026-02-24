import { PrivateSetting, PublicSetting } from "../../types/settings";

export const toPublicSetting = (s: PrivateSetting): PublicSetting => {
	return {
		id: s.id,
		userId: s.user_id,
		preferences: s.preferences,
		createdAt: s.created_at,
		updatedAt: s.updated_at,
	};
};

export const toPublicSettings = (
	settings: PrivateSetting[],
): PublicSetting[] => {
	return settings.map((s) => toPublicSetting(s));
};
