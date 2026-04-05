import GamesList from "@/shared/components/GamesList";
import type { GameListRow } from "@/shared/components/GamesList";
import "./index.sass";

export type GamePageGame = GameListRow & { pgn: string };

interface GamePageListProps {
	games: GamePageGame[];
	selectedGameId: string | null;
	onSelectGame: (game: GamePageGame) => void;
}

function GamePageList({
	games,
	selectedGameId,
	onSelectGame,
}: GamePageListProps) {
	if (games.length === 0) {
		return (
			<div className="game-page-list">
				<p className="game-page-list__empty">Aucune partie pour le moment.</p>
			</div>
		);
	}

	return (
		<div className="game-page-list">
			<GamesList
				games={games}
				selectedGameId={selectedGameId}
				onSelectGame={onSelectGame}
			/>
		</div>
	);
}

export default GamePageList;
