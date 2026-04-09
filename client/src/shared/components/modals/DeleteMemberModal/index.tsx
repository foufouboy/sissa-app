import ConfirmModal from "@/shared/components/ConfirmModal";
import type { Member } from "../UpdateMemberGroupModal";

interface DeleteMemberModalProps {
	isOpen: boolean;
	onClose: () => void;
	member: Member | null;
	isSubmitting: boolean;
	error?: string;
	onConfirm: () => void;
}

function DeleteMemberModal({
	isOpen,
	onClose,
	member,
	isSubmitting,
	error,
	onConfirm,
}: DeleteMemberModalProps) {
	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Supprimer le membre"
			description={
				member
					? `Vous allez supprimer ${member.firstName} ${member.lastName} (${member.email}). Cette action est irréversible.`
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
					disabled={isSubmitting || !member}
					onClick={onConfirm}
				>
					{isSubmitting ? "Suppression..." : "Supprimer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default DeleteMemberModal;
