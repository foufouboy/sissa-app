import { useEffect, useState } from "react";
import ConfirmModal from "@/shared/components/ConfirmModal";

export type CreateGameData = {
	pgn: string;
	whitePlayer: string;
	blackPlayer: string;
	result: string;
	event: string;
	gameDate: string;
};

const EMPTY_FORM: CreateGameData = {
	pgn: "",
	whitePlayer: "",
	blackPlayer: "",
	result: "1/2-1/2",
	event: "",
	gameDate: "",
};

interface CreateGameModalProps {
	isOpen: boolean;
	onClose: () => void;
	isSubmitting: boolean;
	error?: string;
	message?: string;
	onConfirm: (data: CreateGameData) => void;
}

function CreateGameModal({
	isOpen,
	onClose,
	isSubmitting,
	error,
	message,
	onConfirm,
}: CreateGameModalProps) {
	const [form, setForm] = useState<CreateGameData>(EMPTY_FORM);

	useEffect(() => {
		if (!isOpen) setForm(EMPTY_FORM);
	}, [isOpen]);

	const set =
		(key: keyof CreateGameData) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) =>
			setForm((prev) => ({ ...prev, [key]: e.target.value }));

	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Nouvelle partie"
			description="Renseignez les informations de la partie."
		>
			{error && <p className="modal-error">{error}</p>}
			{message && <p className="modal-success">{message}</p>}

			<div className="modal-form">
				<div className="modal-form__grid">
					<div className="modal-field">
						<label className="modal-label">Joueur blanc</label>
						<input
							className="modal-input"
							type="text"
							placeholder="ex. Magnus Carlsen"
							value={form.whitePlayer}
							onChange={set("whitePlayer")}
							disabled={isSubmitting}
							required
						/>
					</div>
					<div className="modal-field">
						<label className="modal-label">Joueur noir</label>
						<input
							className="modal-input"
							type="text"
							placeholder="ex. Fabiano Caruana"
							value={form.blackPlayer}
							onChange={set("blackPlayer")}
							disabled={isSubmitting}
							required
						/>
					</div>
					<div className="modal-field">
						<label className="modal-label">Résultat</label>
						<select
							className="modal-input modal-select"
							value={form.result}
							onChange={set("result")}
							disabled={isSubmitting}
							required
						>
							<option value="1-0">1-0 (Blancs gagnent)</option>
							<option value="0-1">0-1 (Noirs gagnent)</option>
							<option value="1/2-1/2">½-½ (Nulle)</option>
						</select>
					</div>
					<div className="modal-field">
						<label className="modal-label">Date</label>
						<input
							className="modal-input"
							type="date"
							value={form.gameDate}
							onChange={set("gameDate")}
							disabled={isSubmitting}
							required
						/>
					</div>
					<div className="modal-field modal-field--full">
						<label className="modal-label">Événement</label>
						<input
							className="modal-input"
							type="text"
							placeholder="ex. World Chess Championship"
							value={form.event}
							onChange={set("event")}
							disabled={isSubmitting}
							required
						/>
					</div>
					<div className="modal-field modal-field--full">
						<label className="modal-label">PGN</label>
						<textarea
							className="modal-input modal-textarea"
							placeholder="Collez le PGN ici"
							value={form.pgn}
							onChange={set("pgn")}
							disabled={isSubmitting}
							required
						/>
					</div>
				</div>
			</div>

			<div className="modal-actions">
				<button
					type="button"
					className="modal-btn modal-btn--cancel"
					onClick={onClose}
					disabled={isSubmitting}
				>
					Annuler
				</button>
				<button
					type="button"
					className="modal-btn modal-btn--confirm"
					disabled={
						isSubmitting ||
						!form.whitePlayer.trim() ||
						!form.blackPlayer.trim() ||
						!form.pgn.trim()
					}
					onClick={() => onConfirm(form)}
				>
					{isSubmitting ? "Création..." : "Créer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default CreateGameModal;
