import { useRouteError, useNavigate } from "react-router";
import CatNothing from "@/assets/nothing_cat.png";
import GenericButton from "../GenericButton";
import "./index.sass";

function ErrorBoundary() {
	const error = useRouteError() as any;
	const navigate = useNavigate();

	const errorStatus = error?.status || 500;
	const errorMessage =
		error?.statusText ||
		error?.message ||
		"Une erreur inattendue s'est produite";

	return (
		<div className="error-boundary">
			<div className="error-content">
				<img src={CatNothing} alt="Error Cat" className="error-image" />
				<h1 className="error-title">Oupsie !</h1>
				<h2 className="error-subtitle">
					Il y a eu un problème lors de la requête.
				</h2>
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
