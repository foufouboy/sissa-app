import { Home, Calendar, ChessQueen, Mail, User } from "lucide-react";
import { useLocation } from "react-router";
import MenuItem from "./MenuItem";
import "./index.sass";

function Footer() {
	const location = useLocation();
	const menuItems = [
		{ icon: Home, label: "Home", to: "/" },
		{ icon: Calendar, label: "Events", to: "/events" },
		{ icon: ChessQueen, label: "Games", to: "/games" },
		{ icon: Mail, label: "Messages", to: "/notifications" },
		{ icon: User, label: "Profile", to: "/profile" },
	];

	return (
		<footer className="footer">
			<nav className="footer-nav">
				<ul className="footer-nav__list">
					{menuItems.map((item) => (
						<MenuItem
							key={item.to}
							icon={item.icon}
							label={item.label}
							to={item.to}
							isActive={location.pathname === item.to}
						/>
					))}
				</ul>
			</nav>
		</footer>
	);
}

export default Footer;
