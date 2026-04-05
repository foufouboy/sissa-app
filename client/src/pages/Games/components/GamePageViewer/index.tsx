import GameViewer from "@/shared/components/GameViewer";
import "./index.sass";

interface GamePageViewerProps {
	pgn: string;
}

function GamePageViewer({ pgn }: GamePageViewerProps) {
	const trimmed = pgn.trim();

	return (
		<div className="game-page-viewer">
			{trimmed ? (
				<GameViewer pgn={trimmed} showMoves={"bottom"} />
			) : (
				<p className="game-page-viewer__placeholder">
					Sélectionnez une partie ou importez un PGN pour afficher
					l'échiquier.
				</p>
			)}
		</div>
	);
}

export default GamePageViewer;
