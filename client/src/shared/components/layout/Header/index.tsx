import CatLogo from "@/assets/logo.png";
import { BellDot, CircleUserRound } from "lucide-react";
import "./index.sass";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={CatLogo} alt="Cat Logo" className="cat-logo" width={45} />
        <div className="header-left-title">
          <h1 className="tablet">Sissa</h1>
          <h2 className="tablet subtitle">Gestion de clubs d'échecs</h2>
        </div>
      </div>
      <div className="header-right">
        <BellDot color="white" strokeWidth={1.5} />
        <div className="separator tablet"></div>
        <div className="header-right-account">
          <div className="name-and-role tablet">
            <span className="name">Marc Aurèle</span>
            <span className="role">Administrateur</span>
          </div>
          <CircleUserRound strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}

export default Header;
