import CatLogo from "@/assets/logo.png";
import {
	BellDot,
	CircleUserRound,
	User,
	Settings,
	LogOut,
	ShieldCheck,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import "./index.sass";
import { useAuth } from "@/shared/contexts/AuthContext";

function Header() {
	const { user, isLoading, logout } = useAuth();
	console.log(user);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/auth/login");
	};

	const handleNavigation = (path: string) => {
		setIsDropdownOpen(false);
		navigate(path);
	};

	return (
		<header className="header">
			<div className="header-left">
				<Link to="/">
					<img
						src={CatLogo}
						alt="Cat Logo"
						className="cat-logo"
						width={45}
					/>
				</Link>
				<div className="header-left-title">
					<h1 className="tablet">Sissa</h1>
					<h2 className="tablet subtitle">
						Gestion de clubs d'échecs
					</h2>
				</div>
			</div>
			<div className="header-right">
				<BellDot color="white" strokeWidth={1.5} />
				<div className="separator tablet"></div>
				<div className="header-right-account" ref={dropdownRef}>
					<div className="name-and-role tablet">
						<span className="name">
							{isLoading ? "Utilisateur" : user?.fullName}
						</span>
						<span className="role">
							{isLoading ? "Membre" : user?.role}
						</span>
					</div>
					<CircleUserRound
						strokeWidth={1.5}
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						style={{ cursor: "pointer" }}
					/>
					{isDropdownOpen && (
						<div className="profile-dropdown">
							<button
								className="dropdown-item"
								onClick={() => handleNavigation("/profile")}
							>
								<User size={18} />
								<span>Profil</span>
							</button>
							<button
								className="dropdown-item"
								onClick={() => handleNavigation("/settings")}
							>
								<Settings size={18} />
								<span>Paramètres</span>
							</button>
							{user?.role === "Administrateur" && (
								<>
									<div className="dropdown-separator"></div>
									<button
										className="dropdown-item"
										onClick={() =>
											handleNavigation("/admin/members")
										}
									>
										<ShieldCheck size={18} />
										<span>Gestion des membres</span>
									</button>
								</>
							)}
							<div className="dropdown-separator"></div>
							<button
								className="dropdown-item logout"
								onClick={handleLogout}
							>
								<LogOut size={18} />
								<span>Déconnexion</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
