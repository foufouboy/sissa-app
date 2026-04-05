import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Logo from "@/assets/logo_transparent.png";
import GenericButton from "@/shared/components/GenericButton";
import { useAuth } from "@/shared/contexts/AuthContext";
import { getRegisterValidationErrorMessage } from "@/shared/utils/utils";
import "@/shared/styles/auth.sass";
import "./index.sass";

function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Les mots de passe ne correspondent pas");
			return;
		}

		setIsLoading(true);

		try {
			await register(
				email,
				password,
				confirmPassword,
				firstName,
				lastName,
			);
			navigate("/");
		} catch (err: any) {
			const validationErrors = err.response.data.errors;

			if (validationErrors) {
				const errorMessage =
					getRegisterValidationErrorMessage(validationErrors);
				setError(errorMessage);
			} else {
				setError(
					err.message ||
						"Une erreur est survenue lors de l'inscription",
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="auth">
			<div className="auth-card">
				<div className="auth-header">
					<img src={Logo} alt="Sissa Logo" className="auth-icon" />
					<h1 className="auth-title">Bienvenue sur Sissa !</h1>
				</div>

				{error && (
					<div className="auth-error">
						<AlertCircle className="auth-error-icon" />
						<p className="auth-error-text">{error}</p>
					</div>
				)}

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="firstName" className="form-label">
							Prénom
						</label>
						<input
							id="firstName"
							type="text"
							className="form-input"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Jean"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="lastName" className="form-label">
							Nom
						</label>
						<input
							id="lastName"
							type="text"
							className="form-input"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Dupont"
							required
						/>
					</div>

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

					<div className="form-group">
						<label htmlFor="confirmPassword" className="form-label">
							Confirmation du mot de passe
						</label>
						<input
							id="confirmPassword"
							type="password"
							className="form-input"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</div>

					<GenericButton className="auth-button" type="submit">
						{isLoading ? "Inscription..." : "S'inscrire"}
					</GenericButton>
				</form>

				<div className="auth-footer">
					<Link to="/auth/login" className="auth-link">
						Déjà un compte ? Se connecter
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
