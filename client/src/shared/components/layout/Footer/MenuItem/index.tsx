import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import "./index.sass";

interface MenuItemProps {
	icon: LucideIcon;
	label: string;
	to: string;
	isActive?: boolean;
}

function MenuItem({ icon: Icon, label, to, isActive = false }: MenuItemProps) {
	return (
		<Link to={to} className={`menu-item ${isActive ? "active" : ""}`}>
			<Icon className="menu-item__icon" />
			<span className="menu-item__label">{label}</span>
		</Link>
	);
}

export default MenuItem;
