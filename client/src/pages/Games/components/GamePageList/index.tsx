import { useState } from "react";
import { ChevronDown } from "lucide-react";
import GamesList from "@/shared/components/GamesList";
import type { GameListRow } from "@/shared/components/GamesList";
import "./index.sass";

export type GamePageGame = GameListRow & {
	pgn: string;
	event?: string;
	gameDate?: string;
	createdAt?: string;
};

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
	const [isOpen, setIsOpen] = useState(true);
	console.log(games);

	return (
		<div className="game-page-list">
			<button
				type="button"
				className={`game-page-list__toggle ${isOpen ? "open" : ""}`}
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
			>
				<span className="game-page-list__toggle-label">
					Mes parties
					<span className="game-page-list__count">
						{games.length}
					</span>
				</span>
				<ChevronDown className="game-page-list__chevron" />
			</button>

			{isOpen && (
				<div className="game-page-list__content">
					{games.length === 0 ? (
						<p className="game-page-list__empty">
							Aucune partie pour le moment.
						</p>
					) : (
						<GamesList
							games={games}
							selectedGameId={selectedGameId}
							onSelectGame={onSelectGame}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default GamePageList;
