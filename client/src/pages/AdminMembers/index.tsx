import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import UpdateMemberGroupModal, {
	type Member,
} from "@/shared/components/modals/UpdateMemberGroupModal";
import DeleteMemberModal from "@/shared/components/modals/DeleteMemberModal";
import "./style.sass";

type ModalType = "updateGroup" | "delete" | null;

function normalizeMember(raw: unknown): Member[] {
	if (Array.isArray(raw)) return raw as Member[];
	return [];
}

const ROLE_LABELS: Record<string, string> = {
	Administrateur: "Administrateur",
	admin: "Administrateur",
	Enseignant: "Enseignant",
	teacher: "Enseignant",
	Membre: "Membre",
	member: "Membre",
};

const GROUP_LABELS: Record<string, string> = {
	Enfant: "Enfant",
	enfant: "Enfant",
	Adulte: "Adulte",
	adulte: "Adulte",
	Loisir: "Loisir",
	loisir: "Loisir",
	Compétition: "Compétition",
	competition: "Compétition",
	Competition: "Compétition",
};

function groupSlug(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

function AdminMembers() {
	const { members: membersRaw } = useLoaderData() as { members: unknown };
	const members = normalizeMember(membersRaw);
	const fetcher = useFetcher();
	const revalidator = useRevalidator();

	const [selectedMember, setSelectedMember] = useState<Member | null>(null);
	const [activeModal, setActiveModal] = useState<ModalType>(null);
	const intentRef = useRef<ModalType>(null);
	const isSubmitting = fetcher.state !== "idle";
	const fetcherError = fetcher.data?.error as string | undefined;
	const fetcherMessage = fetcher.data?.message as string | undefined;

	useEffect(() => {
		if (fetcher.state !== "idle" || !fetcherMessage) return;
		const intent = intentRef.current;
		setActiveModal(null);
		if (intent === "delete") {
			setSelectedMember(null);
			revalidator.revalidate();
		}
		if (intent === "updateGroup") revalidator.revalidate();

		intentRef.current = null;
	}, [fetcher.state, fetcherMessage]);

	const submit = useCallback(
		(intent: ModalType, extra: Record<string, string> = {}) => {
			if (!intent) return;
			intentRef.current = intent;
			fetcher.submit(
				{ _intent: intent, ...extra },
				{ method: "post", action: "/admin/members" },
			);
		},
		[fetcher],
	);

	const closeModal = useCallback(() => setActiveModal(null), []);

	const openModal = (type: ModalType, member: Member) => {
		setSelectedMember(member);
		setActiveModal(type);
	};

	return (
		<div className="admin-members">
			<div className="admin-members__header">
				<h1 className="title">Membres</h1>
				<p className="subtitle">
					Gérez les membres du club — {members.length} membre
					{members.length !== 1 ? "s" : ""}
				</p>
			</div>

			<div className="admin-members__table-wrapper">
				<table className="admin-members__table">
					<thead>
						<tr>
							<th>Nom</th>
							<th className="admin-members__col-email">Email</th>
							<th>Rôle</th>
							<th>Groupe</th>
							<th className="admin-members__col-actions">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{members.map((member) => {
							const isAdmin = member.role === "Administrateur";
							return (
								<tr key={member.id}>
									<td className="admin-members__name">
										{member.firstName} {member.lastName}
									</td>
									<td className="admin-members__col-email admin-members__email">
										{member.email}
									</td>
									<td>
										<span
											className={`admin-members__role-badge admin-members__role-badge--${member.role?.toLowerCase()}`}
										>
											{ROLE_LABELS[member.role] ??
												member.role}
										</span>
									</td>
									<td>
										<div className="admin-members__groups">
											{member.groups?.length ? (
												member.groups.map((g) => (
													<span
														key={g.id}
														className={`group-badge group-badge--${groupSlug(g.name)}`}
													>
														{GROUP_LABELS[g.name] ?? g.name}
													</span>
												))
											) : (
												<span className="admin-members__no-group">
													—
												</span>
											)}
										</div>
									</td>
									<td className="admin-members__col-actions admin-members__actions">
										<button
											className="admin-members__action-btn"
											title="Modifier le groupe"
											onClick={() =>
												openModal("updateGroup", member)
											}
										>
											<Pencil size={15} />
										</button>
										{!isAdmin && (
											<button
												className="admin-members__action-btn admin-members__action-btn--danger"
												title="Supprimer le membre"
												onClick={() =>
													openModal("delete", member)
												}
											>
												<Trash2 size={15} />
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<UpdateMemberGroupModal
				isOpen={activeModal === "updateGroup"}
				onClose={closeModal}
				member={selectedMember}
				isSubmitting={isSubmitting}
				error={activeModal === "updateGroup" ? fetcherError : undefined}
				message={
					activeModal === "updateGroup" ? fetcherMessage : undefined
				}
				onConfirm={(groups) =>
					submit("updateGroup", {
						userId: selectedMember!.id,
						groups: groups.join(","),
					})
				}
			/>

			<DeleteMemberModal
				isOpen={activeModal === "delete"}
				onClose={closeModal}
				member={selectedMember}
				isSubmitting={isSubmitting}
				error={activeModal === "delete" ? fetcherError : undefined}
				onConfirm={() =>
					submit("delete", { userId: selectedMember!.id })
				}
			/>
		</div>
	);
}

export default AdminMembers;
