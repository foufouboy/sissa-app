import { BellDot, CircleUserRound, Feather } from "lucide-react";
import "./index.sass";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Feather color="rgb(129, 78, 231)" size={30} />
      </div>
      <div className="header-right">
        <BellDot color="white" size={20} strokeWidth={1.5} />
        <CircleUserRound color="white" size={20} strokeWidth={1.5} />
      </div>
    </header>
  );
}

export default Header;
