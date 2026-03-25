import "./index.sass";
import transparentLogo from "@/assets/logo_transparent.png";

function Footer() {
	return (
		<footer className="footer">
			<img
				src={transparentLogo}
				alt="Sissa Logo"
				className="footer__logo"
			/>
			<p className="footer__text">
				© {new Date().getFullYear()} Sissa App. Tous droits réservés.
			</p>
			<img
				src={transparentLogo}
				alt="Sissa Logo"
				className="footer__logo"
			/>
		</footer>
	);
}

export default Footer;
