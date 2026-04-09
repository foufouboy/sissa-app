import ConfirmModal from "@/shared/components/ConfirmModal";
import type { GamePageGame } from "@/pages/Games/components/GamePageList";

interface UpdatePgnModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedGame: GamePageGame | null;
	pgnDraft: string;
	isSubmitting: boolean;
	error?: string;
	onConfirm: () => void;
}

function UpdatePgnModal({
	isOpen,
	onClose,
	selectedGame,
	pgnDraft,
	isSubmitting,
	error,
	onConfirm,
}: UpdatePgnModalProps) {
	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Modifier le PGN"
			description={
				selectedGame
					? `Vous allez modifier cette partie ! Êtes-vous sûr de vouloir faire ça ?`
					: "Aucune partie sélectionnée."
			}
		>
			{error && (
				<p className="modal-error">
					Erreur lors de la mise à jour du PGN. Êtes-vous sûr qu'il
					est correct ?
				</p>
			)}
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
					disabled={isSubmitting || !selectedGame || !pgnDraft.trim()}
					onClick={onConfirm}
				>
					{isSubmitting ? "Enregistrement..." : "Confirmer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default UpdatePgnModal;
