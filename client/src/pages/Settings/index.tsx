import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import { useFetcher, useRouteLoaderData, useRevalidator } from "react-router";
import "./style.sass";

function Settings() {
	const { settings } = useRouteLoaderData("root");
	const revalidator = useRevalidator();
	const fetcher = useFetcher();

	const [notifications, setNotifications] = useState(settings.notifications);
	const [darkMode, setDarkMode] = useState(settings.darkMode);
	const [language, setLanguage] = useState(settings.language);
	const [error, setError] = useState("");

	const busy = fetcher.state !== "idle";

	useEffect(() => {
		if (fetcher?.data?.error) {
			setError(
				"Une erreur est survenue lors de la mise à jour des paramètres",
			);
		}
	}, [fetcher.data]);

	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data?.message) {
			revalidator.revalidate();
		}
	}, [fetcher.state, fetcher.data]);

	useEffect(() => {
		setNotifications(settings.notifications);
		setDarkMode(settings.darkMode);
		setLanguage(settings.language);
	}, [settings.notifications, settings.darkMode, settings.language]);

	return (
		<div className="settings">
			<div className="settings-header">
				<h1 className="title">Paramètres</h1>
			</div>

			<GenericCard title="Préférences" className="settings-card">
				<div className="generic-card-content">
					{error && (
						<div className="settings-error">
							<AlertCircle className="settings-error-icon" />
							<p className="settings-error-text">{error}</p>
						</div>
					)}

					{fetcher?.data?.message && (
						<div className="settings-success">
							<p className="settings-success-text">
								{fetcher.data.message}
							</p>
						</div>
					)}

					<fetcher.Form className="settings-form" method="post">
						<div className="form-field">
							<div className="form-field-header">
								<label
									htmlFor="notifications"
									className="form-field-label"
								>
									Notifications des événements
								</label>
								<p className="form-field-description">
									Recevoir des notifications pour les nouveaux
									événements
								</p>
							</div>
							<input
								id="notifications"
								type="checkbox"
								className="form-checkbox"
								checked={notifications}
								onChange={(e) =>
									setNotifications(e.target.checked)
								}
							/>
						</div>

						<div className="form-field">
							<div className="form-field-header">
								<label
									htmlFor="darkMode"
									className="form-field-label"
								>
									Mode sombre
								</label>
								<p className="form-field-description">
									Activer le thème sombre de l'application
								</p>
							</div>
							<input
								id="darkMode"
								type="checkbox"
								className="form-checkbox"
								checked={darkMode}
								onChange={(e) => setDarkMode(e.target.checked)}
							/>
						</div>

						<div className="form-field">
							<div className="form-field-header">
								<label
									htmlFor="language"
									className="form-field-label"
								>
									Langue
								</label>
								<p className="form-field-description">
									Choisir la langue de l'application
								</p>
							</div>
							<select
								id="language"
								className="form-select"
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
							>
								<option value="fr">Français</option>
								<option value="en">English</option>
							</select>
						</div>

						<GenericButton
							className="settings-button"
							onClick={() => {
								console.log({
									notifications,
									darkMode,
									language,
								});
								fetcher.submit(
									{ notifications, darkMode, language },
									{ method: "post" },
								);
							}}
							disabled={busy}
						>
							{busy ? "Enregistrement..." : "Enregistrer"}
						</GenericButton>
					</fetcher.Form>
				</div>
			</GenericCard>
		</div>
	);
}

export default Settings;
