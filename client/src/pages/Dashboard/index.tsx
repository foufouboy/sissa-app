import { useLoaderData } from "react-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import BlogWidget from "./components/BlogWidget";
import EventsWidget from "./components/EventsWidget";
import GamesWidget from "./components/GamesWidget";
import MessagesWidget from "./components/MessagesWidget";
import PuzzleWidget from "./components/PuzzleWidget";
import AdminWidget from "./components/AdminWidget";
import "./index.sass";

interface DashboardRecords {
	events: any;
	games: any;
	messages: any;
	adminUsersOverview?: {
		totalUsers: number;
		usersByRole: { teacher?: number; member?: number; admin?: number };
	};
}

function Dashboard() {
	const { records } = useLoaderData() as { records: DashboardRecords };
	const { user } = useAuth();

	const isAdmin = user?.role === "Administrateur";

	return (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1 className="title">Dashboard</h1>
				<p className="subtitle">
					Bienvenue sur votre tableau de bord ! Retrouvez ici toutes
					vos activités récentes.
				</p>
			</div>
			<div className="widgets-container">
				{isAdmin && records.adminUsersOverview && (
					<AdminWidget adminUsersOverview={records.adminUsersOverview} />
				)}
				<GamesWidget games={records.games} />
				<MessagesWidget messages={records.messages} />
				<PuzzleWidget />
				<EventsWidget events={records.events} />
				<BlogWidget />
			</div>
		</div>
	);
}

export default Dashboard;
