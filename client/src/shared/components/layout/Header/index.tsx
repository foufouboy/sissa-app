import { BellDot, ChessQueen, CircleUserRound } from "lucide-react";
import "./index.sass";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <ChessQueen color="white" />
        <div className="header-left-title">
          <h1>Sissa</h1>
          <h2 className="tablet subtitle">Gestion de clubs d'échecs</h2>
        </div>
      </div>
      <div className="header-right">
        <BellDot color="white" strokeWidth={1.5} />
        <div className="separator tablet"></div>
        <div className="header-right-account">
          <CircleUserRound color="white" strokeWidth={1.5} />
          <span className="tablet">Marc Aurèle</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
