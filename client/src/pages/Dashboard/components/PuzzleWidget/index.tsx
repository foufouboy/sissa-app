import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import { Link } from "react-router";
import "./index.sass";

function PuzzleWidget() {
  return (
    <GenericCard
      title="Puzzle du jour"
      className="puzzle-widget"
      collapsible={true}
      defaultOpen={false}
    >
      <div className="generic-card-content">
        <div className="puzzle-content">
          <iframe 
            src="https://lichess.org/training/frame?theme=brown&bg=light"
            title="Puzzle du jour"
            style={{ }}
          ></iframe>
        </div>
        <GenericButton className="generic-button-primary">
          <Link to="/puzzles">Voir plus</Link>
        </GenericButton>
      </div>
    </GenericCard>
  );
}

export default PuzzleWidget;
