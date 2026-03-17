import BlogWidget from "./components/BlogWidget";
import EventsWidget from "./components/EventsWidget";
import GamesWidget from "./components/GamesWidget";
import MessagesWidget from "./components/MessagesWidget";
import PuzzleWidget from "./components/PuzzleWidget";
import "./index.sass";

function Dashboard() {
	return (
		<div className="dashboard">
			<div className="widgets-container">
				<GamesWidget />
				<MessagesWidget />
				<PuzzleWidget />
				<EventsWidget />
				<BlogWidget />
			</div>
		</div>
	);
}

export default Dashboard;
