import { Link } from "react-router";
import { Users, ShieldCheck, GraduationCap, User } from "lucide-react";
import GenericCard from "@/shared/components/GenericCard";
import GenericButton from "@/shared/components/GenericButton";
import "./index.sass";

interface AdminUsersOverview {
	totalUsers: number;
	usersByRole: {
		teacher?: number;
		member?: number;
		admin?: number;
	};
}

interface AdminWidgetProps {
	adminUsersOverview: AdminUsersOverview;
}

const ROLE_CONFIG = [
	{ key: "member" as const, label: "Membres", icon: User },
	{ key: "teacher" as const, label: "Enseignants", icon: GraduationCap },
	{ key: "admin" as const, label: "Admins", icon: ShieldCheck },
];

function AdminWidget({ adminUsersOverview }: AdminWidgetProps) {
	const { totalUsers, usersByRole } = adminUsersOverview;

	return (
		<GenericCard title="Gestion des membres" className="admin-widget">
			<div className="admin-widget__content">
				<div className="admin-widget__total">
					<Users size={20} strokeWidth={1.5} />
					<span className="admin-widget__total-count">{totalUsers}</span>
					<span className="admin-widget__total-label">membres au total</span>
				</div>

				<div className="admin-widget__roles">
					{ROLE_CONFIG.map(({ key, label, icon: Icon }) => {
						const count = usersByRole[key] ?? 0;
						const pct = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
						return (
							<div key={key} className="admin-widget__role-row">
								<div className="admin-widget__role-info">
									<Icon size={14} strokeWidth={1.5} />
									<span className="admin-widget__role-label">{label}</span>
									<span className="admin-widget__role-count">{count}</span>
								</div>
								<div className="admin-widget__bar-track">
									<div
										className="admin-widget__bar-fill"
										style={{ width: `${pct}%` }}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<GenericButton className="generic-button-primary">
					<Link to="/admin/members">Gérer les membres</Link>
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default AdminWidget;
