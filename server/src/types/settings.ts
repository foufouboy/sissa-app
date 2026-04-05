export interface PrivateSetting {
  id: number;
  user_id: number;
  preferences: {
    darkMode?: boolean;
    language?: "en" | "fr";
    notifications?: boolean;
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
    darkMode?: boolean;
    language?: "en" | "fr";
    notifications?: boolean;
  };
};

export type CreateSettingInput = Pick<PublicSetting, "userId" | "preferences">;
