import GenericCard from "@/shared/components/GenericCard";
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
          <iframe src="https://lichess.org/training/frame?theme=brown&bg=light"></iframe>
        </div>
      </div>
    </GenericCard>
  );
}

export default PuzzleWidget;
