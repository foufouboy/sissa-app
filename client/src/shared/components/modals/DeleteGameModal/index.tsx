import ConfirmModal from "@/shared/components/ConfirmModal";
import type { GamePageGame } from "@/pages/Games/components/GamePageList";

interface DeleteGameModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedGame: GamePageGame | null;
	isSubmitting: boolean;
	error?: string;
	onConfirm: () => void;
}

function DeleteGameModal({
	isOpen,
	onClose,
	selectedGame,
	isSubmitting,
	error,
	onConfirm,
}: DeleteGameModalProps) {
	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Supprimer la partie"
			description={
				selectedGame
					? `Vous allez supprimer cette partie ! Êtes-vous sûr de vouloir faire ça ?`
					: ""
			}
		>
			{error && <p className="modal-error">{error}</p>}
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
					className="modal-btn modal-btn--danger"
					disabled={isSubmitting || !selectedGame}
					onClick={onConfirm}
				>
					{isSubmitting ? "Suppression..." : "Supprimer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default DeleteGameModal;
