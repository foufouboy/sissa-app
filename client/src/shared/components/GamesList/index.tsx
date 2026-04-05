import GameListItem from "@/shared/components/GameListItem";
import "./index.sass";

export type GameListRow = {
	id: string;
	whitePlayer: string;
	blackPlayer: string;
	result: string;
};

interface GamesListProps<T extends GameListRow> {
	games: T[];
	selectedGameId: string | null;
	onSelectGame: (game: T) => void;
	className?: string;
}

function GamesList<T extends GameListRow>({
	games,
	selectedGameId,
	onSelectGame,
	className,
}: GamesListProps<T>) {
	return (
		<div className={["games-list", className].filter(Boolean).join(" ")}>
			{games.map((game, index) => (
				<GameListItem
					key={game.id}
					index={index}
					whitePlayer={game.whitePlayer}
					blackPlayer={game.blackPlayer}
					result={game.result}
					isSelected={selectedGameId === game.id}
					onClick={() => onSelectGame(game)}
				/>
			))}
		</div>
	);
}

export default GamesList;
