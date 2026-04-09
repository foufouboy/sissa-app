import { Calendar, ChessQueen, Home, Mail, Users, User } from "lucide-react";
import { useLocation } from "react-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import MenuItem from "./MenuItem";
import "./index.sass";

function Nav() {
	const location = useLocation();
	const { user } = useAuth();
	const isAdmin = user?.role === "Administrateur";

	const menuItems = [
		{ icon: Home, label: "Home", to: "/" },
		{ icon: Calendar, label: "Agenda", to: "/events" },
		{ icon: ChessQueen, label: "Parties", to: "/games" },
		isAdmin
			? { icon: Users, label: "Membres", to: "/admin/members" }
			: { icon: Mail, label: "Messages", to: "/notifications" },
		{ icon: User, label: "Profil", to: "/profile" },
	];
	console.log(menuItems);

	return (
		<nav className="nav">
			<ul className="nav__list">
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
	);
}

export default Nav;
