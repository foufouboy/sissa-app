import LichessPgnViewer from "@lichess-org/pgn-viewer";
import { useEffect, useRef } from "react";
import "./index.sass";

function GameViewer({
	pgn,
	showMoves = false,
	showPlayers = true,
}: {
	pgn: string;
	showMoves?: "right" | "bottom" | "auto" | false;
	showPlayers?: boolean;
}) {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!wrapperRef.current) return;

		wrapperRef.current.innerHTML = "";
		const container = document.createElement("div");
		wrapperRef.current.appendChild(container);

		LichessPgnViewer(container, {
			pgn,
			showControls: true,
			showMoves: showMoves ? showMoves : false,
			showPlayers,
		});
	}, [pgn]);

	return <div className="game-viewer" ref={wrapperRef}></div>;
}

export default GameViewer;
