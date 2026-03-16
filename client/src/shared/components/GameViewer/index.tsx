import LichessPgnViewer from "@lichess-org/pgn-viewer";
import { useEffect, useRef } from "react";
import "./index.sass";

function GameViewer({ pgn }: { pgn: string }) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      LichessPgnViewer(viewerRef.current, {
        pgn,
        showControls: true,
        showMoves: false,
        showPlayers: true,
      });
    }
  }, [pgn]);

  return <div className="game-viewer" ref={viewerRef}></div>;
}

export default GameViewer;
