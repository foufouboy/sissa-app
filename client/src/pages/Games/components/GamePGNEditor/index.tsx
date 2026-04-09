import GenericButton from "@/shared/components/GenericButton";
import "./index.sass";

interface GamePGNEditorProps {
	value: string;
	onChange: (value: string) => void;
	onModify: () => void;
}

function GamePGNEditor({ value, onChange, onModify }: GamePGNEditorProps) {
	return (
		<div className="game-pgn-editor">
			<div className="game-pgn-editor__field">
				<label
					className="game-pgn-editor__label"
					htmlFor="game-pgn-textarea"
				>
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
				<GenericButton className="" onClick={onModify}>
					Modifier le PGN
				</GenericButton>
			</div>
		</div>
	);
}

export default GamePGNEditor;
