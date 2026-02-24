export interface PrivateSetting {
	id: number;
	user_id: number;
	preferences: {
		theme?: "light" | "dark";
		language?: "en" | "fr";
		notifications?: boolean;
		email?: boolean;
	};
	created_at: Date;
	updated_at: Date;
}

export type PublicSetting = Omit<
	PrivateSetting,
	"user_id" | "created_at" | "updated_at"
> & {
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	preferences: {
		theme: "light" | "dark";
		language: "en" | "fr";
		notifications: boolean;
		email: boolean;
	};
};

export type CreateSettingInput = Pick<PublicSetting, "userId" | "preferences">;
