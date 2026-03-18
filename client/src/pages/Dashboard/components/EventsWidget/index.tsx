import EventListItem from "@/shared/components/EventListItem";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import NothingCat from "@/shared/components/NothingCat";
import { events } from "@/shared/utils/mockData";
import { Link } from "react-router";
import "./index.sass";

function EventsWidget() {
	const today = new Date();
	const upcomingEvents = events
		.filter((event) => new Date(event.startDate) >= today)
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
		.slice(0, 3);

	return (
		<GenericCard title="Événements à venir" className="events-widget">
			<div className="generic-card-content">
				{upcomingEvents.length === 0 ? (
					<NothingCat />
				) : (
					<>
						<div className="events-list">
							{upcomingEvents.map((event) => (
								<EventListItem
									key={event.id}
									title={event.title}
									description={event.description}
									startDate={event.startDate}
									location={event.location}
									allDay={event.allDay}
								/>
							))}
						</div>
						<GenericButton className="generic-button-primary">
							<Link to="/events">Voir plus</Link>
						</GenericButton>
					</>
				)}
			</div>
		</GenericCard>
	);
}

export default EventsWidget;
