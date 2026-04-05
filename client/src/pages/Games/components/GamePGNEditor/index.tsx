import { Play } from "lucide-react";
import "./index.sass";

interface GamePGNEditorProps {
	value: string;
	onChange: (value: string) => void;
	onImport: () => void;
}

function GamePGNEditor({ value, onChange, onImport }: GamePGNEditorProps) {
	return (
		<div className="game-pgn-editor">
			<div className="game-pgn-editor__field">
				<label className="game-pgn-editor__label" htmlFor="game-pgn-textarea">
					PGN
				</label>
				<textarea
					id="game-pgn-textarea"
					className="game-pgn-editor__textarea"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					spellCheck={false}
					rows={12}
				/>
			</div>
			<div className="game-pgn-editor__actions">
				<button
					type="button"
					className="game-pgn-editor__button"
					onClick={onImport}
				>
					<Play className="game-pgn-editor__button-icon" aria-hidden />
					Importer le PGN
				</button>
			</div>
		</div>
	);
}

export default GamePGNEditor;
