import "./index.sass";

interface GameListItemProps {
	index: number;
	whitePlayer: string;
	blackPlayer: string;
	result: string;
	isSelected: boolean;
	onClick: () => void;
}

function GameListItem({
	index,
	whitePlayer,
	blackPlayer,
	result,
	isSelected,
	onClick,
}: GameListItemProps) {
	const [whiteResult, blackResult] = result.split("-");

	const whiteResultColor =
		whiteResult === "1"
			? "win-color"
			: whiteResult === "0"
				? "loss-color"
				: "draw-color";

	const blackResultColor =
		blackResult === "1"
			? "win-color"
			: blackResult === "0"
				? "loss-color"
				: "draw-color";

	return (
		<div
			className={`game-item ${isSelected ? "selected-game" : ""}`}
			onClick={onClick}
		>
			<span className="game-index">{index + 1}</span>
			<span className="game-player-results">
				<span className="game-player-result">
					<span className="game-player-result-name">{whitePlayer}</span>
					<span className={`game-player-result-score ${whiteResultColor}`}>
						{whiteResult === "1/2" ? "½" : whiteResult}
					</span>
				</span>
				<span className="game-player-result">
					<span className="game-player-result-name">{blackPlayer}</span>
					<span className={`game-player-result-score ${blackResultColor}`}>
						{blackResult === "1/2" ? "½" : blackResult}
					</span>
				</span>
			</span>
		</div>
	);
}

export default GameListItem;
