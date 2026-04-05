import GamesList from "@/shared/components/GamesList";
import GameViewer from "@/shared/components/GameViewer";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./index.sass";

interface GamesWidgetProps {
	games: {
		recentGames: Array<{
			id: string;
			pgn: string;
			whitePlayer: string;
			blackPlayer: string;
			result: string;
		}>;
	};
}

type RecentGame = GamesWidgetProps["games"]["recentGames"][number];

function GamesWidget({ games }: GamesWidgetProps) {
	const { recentGames } = games;

	const [selectedGame, setSelectedGame] = useState<RecentGame | null>(
		recentGames[0] ?? null,
	);

	useEffect(() => {
		setSelectedGame(recentGames[0] ?? null);
	}, [recentGames]);

	return (
		<GenericCard title="Parties récentes" className="games-widget">
			<div className="generic-card-content">
				<div className="games-content">
					{selectedGame && <GameViewer pgn={selectedGame.pgn} />}
					<GamesList
						games={recentGames}
						selectedGameId={selectedGame?.id ?? null}
						onSelectGame={setSelectedGame}
					/>
				</div>
				<GenericButton className="generic-button-primary">
					<Link to="/games">Voir plus</Link>
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default GamesWidget;
