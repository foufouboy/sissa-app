import GameListItem from "@/shared/components/GameListItem";
import GameViewer from "@/shared/components/GameViewer";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import { games } from "@/shared/utils/mockData";
import { useState } from "react";
import "./index.sass";

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
						{games.recentGames.map((game, index) => (
							<GameListItem
								key={game.id}
								index={index}
								whitePlayer={game.whitePlayer}
								blackPlayer={game.blackPlayer}
								result={game.result}
								isSelected={selectedGame?.id === game.id}
								onClick={() => setSelectedGame(game)}
							/>
						))}
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
