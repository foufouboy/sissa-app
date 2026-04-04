import GameListItem from "@/shared/components/GameListItem";
import GameViewer from "@/shared/components/GameViewer";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import "./index.sass";

function GamesWidget({ games }) {
	const { recentGames } = games;

	const [selectedGame, setSelectedGame] = useState<{
		id: string;
		pgn: string;
	} | null>(recentGames[0] ?? null);

	useEffect(() => {
		setSelectedGame(recentGames[0] ?? null);
	}, [recentGames]);

	return (
		<GenericCard title="Parties récentes" className="games-widget">
			<div className="generic-card-content">
				<div className="games-content">
					{selectedGame && <GameViewer pgn={selectedGame.pgn} />}
					<div className="games-list">
						{recentGames.map((game: any, index: number) => (
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
					<Link to="/games">Voir plus</Link>
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default GamesWidget;
