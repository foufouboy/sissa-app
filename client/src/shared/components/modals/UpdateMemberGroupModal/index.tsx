import { useState } from "react";
import ConfirmModal from "@/shared/components/ConfirmModal";

export interface Group {
	id: string;
	name: string;
}

export interface Member {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	groups: Group[];
}

interface UpdateMemberGroupModalProps {
	isOpen: boolean;
	onClose: () => void;
	member: Member | null;
	availableGroups: Group[];
	isSubmitting: boolean;
	error?: string;
	message?: string;
	onConfirm: (groupIds: string[]) => void;
}

const GROUP_LABELS: Record<string, string> = {
	child: "Enfant",
	adult: "Adulte",
	hobby: "Loisir",
	competitive: "Compétition",
};

function UpdateMemberGroupModal({
	isOpen,
	onClose,
	member,
	availableGroups,
	isSubmitting,
	error,
	message,
	onConfirm,
}: UpdateMemberGroupModalProps) {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const toggle = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Modifier les groupes"
			description={
				member
					? `Sélectionnez les groupes de ${member.firstName} ${member.lastName}`
					: ""
			}
		>
			{error && <p className="modal-error">{error}</p>}
			{message && <p className="modal-success">{message}</p>}

			<div className="modal-field">
				<label className="modal-label">Groupes</label>
				<div className="modal-checkboxes">
					{availableGroups.map((g) => (
						<label key={g.id} className="modal-checkbox-label">
							<input
								type="checkbox"
								checked={selectedIds.includes(g.id)}
								onChange={() => toggle(g.id)}
								disabled={isSubmitting}
							/>
							<span
								className={`group-badge group-badge--${g.name}`}
							>
								{GROUP_LABELS[g.name]}
							</span>
						</label>
					))}
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
					disabled={isSubmitting}
					onClick={() => {
						onConfirm(selectedIds);
						setSelectedIds([]);
					}}
				>
					{isSubmitting ? "Enregistrement..." : "Confirmer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default UpdateMemberGroupModal;
