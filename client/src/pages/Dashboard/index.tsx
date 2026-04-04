import BlogWidget from "./components/BlogWidget";
import EventsWidget from "./components/EventsWidget";
import GamesWidget from "./components/GamesWidget";
import MessagesWidget from "./components/MessagesWidget";
import PuzzleWidget from "./components/PuzzleWidget";
import "./index.sass";
import { useLoaderData } from "react-router";

function Dashboard() {
	const {
		records: { events, games, messages },
	} = useLoaderData();

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
				<GamesWidget games={games} />
				<MessagesWidget messages={messages} />
				<PuzzleWidget />
				<EventsWidget events={events} />
				<BlogWidget />
			</div>
		</div>
	);
}

export default Dashboard;
