import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Logo from "@/assets/logo_transparent.png";
import GenericButton from "@/shared/components/GenericButton";
import { useAuth } from "@/shared/contexts/AuthContext";
import "@/shared/styles/auth.sass";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			console.log("here");
			await login(email, password);
			navigate("/");
		} catch (err: any) {
			setError(
				`Une erreur est survenue lors de la connexion. 
				Vérifiez que vos identifiants sont corrects !`,
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="auth">
			<div className="auth-card">
				<div className="auth-header">
					<img src={Logo} alt="Sissa Logo" className="auth-icon" />
					<h1 className="auth-title">Sissa</h1>
					<p className="auth-subtitle">Connexion</p>
				</div>

				{error && (
					<div className="auth-error">
						<AlertCircle className="auth-error-icon" />
						<p className="auth-error-text">{error}</p>
					</div>
				)}

				<form className="auth-form" onSubmit={handleSubmit}>
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

					<GenericButton
						className="auth-button"
						type="submit"
						disabled={isLoading}
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}
					>
						{isLoading ? "Connexion..." : "Se connecter"}
					</GenericButton>
				</form>

				<div className="auth-footer">
					<Link to="/auth/register" className="auth-link">
						Pas encore de compte ? S'inscrire
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
