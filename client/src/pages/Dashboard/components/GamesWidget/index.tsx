import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import "./index.sass";
import GameViewer from "@/shared/components/GameViewer";
import { games } from "@/shared/utils/mockData";
import { useState } from "react";

function GamesWidget() {
	const [selectedGame, setSelectedGame] = useState<{
		id: string;
		pgn: string;
	} | null>(games.recentGames[0]);

	return (
		<GenericCard title="Parties récentes" className="games-widget">
			<div className="generic-card-content">
				<div className="games-content">
					{selectedGame && <GameViewer pgn={selectedGame.pgn} />}
					<div className="games-list">
						{games.recentGames.map((game, index) => {
							const result = game.result.split("-");
							const whiteResult = result[0];
							const blackResult = result[1];

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
									key={game.id}
									className={`game-item ${selectedGame?.id === game.id ? "selected-game" : ""}`}
									onClick={() => setSelectedGame(game)}
								>
									<span className="game-index">
										{index + 1}
									</span>
									<span className="game-player-results">
										<span className="game-player-result">
											<span className="game-player-result-name">
												{game.whitePlayer}
											</span>
											<span
												className={`game-player-result-score ${whiteResultColor}`}
											>
												{whiteResult === "1/2"
													? "½"
													: whiteResult}
											</span>
										</span>
										<span className="game-player-result">
											<span className="game-player-result-name">
												{game.blackPlayer}
											</span>
											<span
												className={`game-player-result-score ${blackResultColor}`}
											>
												{blackResult === "1/2"
													? "½"
													: blackResult}
											</span>
										</span>
									</span>
								</div>
							);
						})}
					</div>
				</div>
				<GenericButton className="generic-button-primary">
					Voir plus
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default GamesWidget;
