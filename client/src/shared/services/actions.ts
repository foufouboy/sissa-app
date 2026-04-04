import settingsService from "./settings.service";
import type { ActionFunctionArgs } from "react-router";

const actions = {
	updateSettings: async ({ request }: ActionFunctionArgs) => {
		try {
			const formData = await request.formData();

			const settings = {
				notifications: formData.get("notifications") === "true",
				darkMode: formData.get("darkMode") === "true",
				language: formData.get("language"),
			};
			console.log(settings, "actions");

			const response = await settingsService.updateSettings(settings);

			if (response.error) {
				console.log("Erreur dans les actions");
				return { error: response.error };
			}
			return { message: "Paramètres mis à jour avec succès !" };
		} catch (error: any) {
			console.log(error.response);
			return { error: error.data.errors };
		}
	},
};

export default actions;
