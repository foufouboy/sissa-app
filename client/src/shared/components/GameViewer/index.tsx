import LichessPgnViewer from "@lichess-org/pgn-viewer";
import { useEffect, useRef } from "react";
import "./index.sass";

function GameViewer({
	pgn,
	showMoves = false,
}: {
	pgn: string;
	showMoves?: "right" | "bottom" | "auto" | false;
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
			showPlayers: true,
		});
	}, [pgn]);

	return <div className="game-viewer" ref={wrapperRef}></div>;
}

export default GameViewer;
