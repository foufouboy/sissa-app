import LichessPgnViewer from "@lichess-org/pgn-viewer";
import { useEffect, useRef } from "react";
import "./index.sass";

function GameViewer({ pgn }: { pgn: string }) {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!wrapperRef.current) return;

		wrapperRef.current.innerHTML = "";
		const container = document.createElement("div");
		wrapperRef.current.appendChild(container);

		LichessPgnViewer(container, {
			pgn,
			showControls: true,
			showMoves: false,
			showPlayers: true,
		});
	}, [pgn]);

	return <div className="game-viewer" ref={wrapperRef}></div>;
}

export default GameViewer;
