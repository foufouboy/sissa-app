import { CalendarDays, Trophy } from "lucide-react";
import GameViewer from "@/shared/components/GameViewer";
import "./index.sass";

interface GamePageViewerProps {
	pgn: string;
	gameDate?: string;
	event?: string;
	options?: {
		showMoves?: "right" | "bottom" | "auto" | false;
		showPlayers?: boolean;
	};
}

function GamePageViewer({ pgn, gameDate, event, options }: GamePageViewerProps) {
	const hasMeta = gameDate || event;
	const formattedDate = gameDate
		? new Date(gameDate).toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})
		: null;

	return (
		<div className="game-page-viewer">
			{hasMeta && (
				<div className="game-page-viewer__meta">
					{event && (
						<span className="game-page-viewer__meta-item">
							<Trophy size={18} color="rgb(103, 82, 214)" />
							{event}
						</span>
					)}
					{formattedDate && (
						<span className="game-page-viewer__meta-item">
							<CalendarDays size={18} color="rgb(103, 82, 214)" />
							{formattedDate}
						</span>
					)}
				</div>
			)}
			<GameViewer
				pgn={pgn}
				showMoves={options?.showMoves}
				showPlayers={options?.showPlayers}
			/>
		</div>
	);
}

export default GamePageViewer;
