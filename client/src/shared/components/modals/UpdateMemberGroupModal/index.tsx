import { useEffect, useState } from "react";
import ConfirmModal from "@/shared/components/ConfirmModal";

export const GROUPS = ["Enfant", "Adulte", "Loisir", "Compétition"] as const;

export interface Member {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	groups: Array<{ id: string; name: string }>;
}

interface UpdateMemberGroupModalProps {
	isOpen: boolean;
	onClose: () => void;
	member: Member | null;
	isSubmitting: boolean;
	error?: string;
	message?: string;
	onConfirm: (groups: string[]) => void;
}

function UpdateMemberGroupModal({
	isOpen,
	onClose,
	member,
	isSubmitting,
	error,
	message,
	onConfirm,
}: UpdateMemberGroupModalProps) {
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		if (isOpen) {
			setSelected(member?.groups?.map((g) => g.name) ?? []);
		}
	}, [isOpen, member]);

	const toggle = (group: string) => {
		setSelected((prev) =>
			prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
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
					{GROUPS.map((g) => (
						<label key={g} className="modal-checkbox-label">
							<input
								type="checkbox"
								checked={selected.includes(g)}
								onChange={() => toggle(g)}
								disabled={isSubmitting}
							/>
							<span className={`group-badge group-badge--${g.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
								{g}
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
					onClick={() => onConfirm(selected)}
				>
					{isSubmitting ? "Enregistrement..." : "Confirmer"}
				</button>
			</div>
		</ConfirmModal>
	);
}

export default UpdateMemberGroupModal;
