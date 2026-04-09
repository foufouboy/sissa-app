import { useRouteError, useNavigate } from "react-router";
import CatNothing from "@/assets/nothing_cat.png";
import GenericButton from "../GenericButton";
import "./index.sass";

const ERROR_MESSAGES: Record<number, { title: string; subtitle: string }> = {
	403: {
		title: "Accès refusé",
		subtitle: "Vous n'avez pas les droits nécessaires pour accéder à cette page.",
	},
	404: {
		title: "Page introuvable",
		subtitle: "La page que vous cherchez n'existe pas ou a été déplacée.",
	},
};

const DEFAULT_MESSAGE = {
	title: "Oupsie !",
	subtitle: "Il y a eu un problème lors de la requête.",
};

function ErrorBoundary() {
	const error = useRouteError() as any;
	const navigate = useNavigate();

	const errorStatus = error?.status || 500;
	const { title, subtitle } = ERROR_MESSAGES[errorStatus] ?? DEFAULT_MESSAGE;

	return (
		<div className="error-boundary">
			<div className="error-content">
				<img src={CatNothing} alt="Error Cat" className="error-image" />
				<h1 className="error-title">{title}</h1>
				<h2 className="error-subtitle">{subtitle}</h2>
				<div className="error-details">
					<span className="error-code">Erreur {errorStatus}</span>
				</div>
				<hr />
				<GenericButton
					className="error-button"
					onClick={() => navigate("/")}
				>
					Retour à l'accueil
				</GenericButton>
			</div>
		</div>
	);
}

export default ErrorBoundary;
