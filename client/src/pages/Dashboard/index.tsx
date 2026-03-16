import BlogWidget from "./components/BlogWidget";
import EventsWidget from "./components/EventsWidget";
import GamesWidget from "./components/GamesWidget";
import MessagesWidget from "./components/MessagesWidget";
import "./index.sass";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="widgets-container">
        <GamesWidget />
        <MessagesWidget />
        <EventsWidget />
        <BlogWidget />
      </div>
    </div>
  );
}

export default Dashboard;
