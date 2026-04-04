import { Calendar, ChessQueen, Home, Mail, User } from "lucide-react";
import { useLocation } from "react-router";
import MenuItem from "./MenuItem";
import "./index.sass";

function Nav() {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Calendar, label: "Agenda", to: "/events" },
    { icon: ChessQueen, label: "Parties", to: "/games" },
    { icon: Mail, label: "Messages", to: "/notifications" },
    { icon: User, label: "Profil", to: "/profile" },
  ];

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
