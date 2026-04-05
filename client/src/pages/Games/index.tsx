import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import type { GamePageGame } from "./components/GamePageList";
import GamePageList from "./components/GamePageList";
import GamePageViewer from "./components/GamePageViewer";
import GamePGNEditor from "./components/GamePGNEditor";
import "./style.sass";

function normalizeGames(raw: unknown): GamePageGame[] {
	if (raw == null) return [];
	if (Array.isArray(raw)) return raw as GamePageGame[];
	if (typeof raw === "object" && "recentGames" in (raw as object)) {
		const r = raw as { recentGames?: GamePageGame[] };
		return Array.isArray(r.recentGames) ? r.recentGames : [];
	}
	return [];
}

function Games() {
	const { games: gamesRaw } = useLoaderData() as { games: unknown };
	const games = useMemo(() => normalizeGames(gamesRaw), [gamesRaw]);

	const [selectedGame, setSelectedGame] = useState<GamePageGame | null>(null);
	const [pgnDraft, setPgnDraft] = useState("");
	const [viewerPgn, setViewerPgn] = useState("");

	useEffect(() => {
		setSelectedGame((prev) => {
			if (games.length === 0) return null;
			if (prev && games.some((g) => g.id === prev.id)) return prev;
			return games[0];
		});
	}, [games]);

	useEffect(() => {
		if (!selectedGame) {
			setPgnDraft("");
			setViewerPgn("");
			return;
		}
		setPgnDraft(selectedGame.pgn ?? "");
		setViewerPgn(selectedGame.pgn ?? "");
	}, [selectedGame]);

	const handleImportPgn = useCallback(() => {
		setViewerPgn(pgnDraft);
	}, [pgnDraft]);

	return (
		<div className="games">
			<div className="games-header">
				<h1 className="title">Parties</h1>
			</div>
			<div className="games-page-content">
				<GamePageViewer pgn={viewerPgn} />
				<GamePageList
					games={games}
					selectedGameId={selectedGame?.id ?? null}
					onSelectGame={setSelectedGame}
				/>
				<GamePGNEditor
					value={pgnDraft}
					onChange={setPgnDraft}
					onImport={handleImportPgn}
				/>
			</div>
		</div>
	);
}

export default Games;
