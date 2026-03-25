import { useState } from "react";
import { AlertCircle } from "lucide-react";
import Logo from "@/assets/logo_transparent.png";
import GenericButton from "@/shared/components/GenericButton";
import auth from "@/shared/services/authService";
import "./index.sass";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await auth.login(email, password);
			console.log(response);
		} catch (error) {
			console.error(error);
			setError("Erreur lors de la connexion");
		}
	};

	return (
		<div className="login">
			<div className="login-card">
				<div className="login-header">
					<img src={Logo} alt="Sissa Logo" className="login-icon" />
					<h1 className="login-title">Sissa</h1>
				</div>

				{error && (
					<div className="login-error">
						<AlertCircle className="login-error-icon" />
						<p className="login-error-text">{error}</p>
					</div>
				)}

				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email" className="form-label">
							E-mail
						</label>
						<input
							id="email"
							type="email"
							className="form-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="votre@email.com"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password" className="form-label">
							Mot de passe
						</label>
						<input
							id="password"
							type="password"
							className="form-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</div>

					<GenericButton className="login-button">
						Se connecter
					</GenericButton>
				</form>

				<div className="login-footer">
					<a href="#" className="login-link">
						Mot de passe oublié ?
					</a>
				</div>
			</div>
		</div>
	);
}

export default Login;
