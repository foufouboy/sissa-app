import EventListItem from "@/shared/components/EventListItem";
import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import NothingCat from "@/shared/components/NothingCat";
import { Link } from "react-router";
import "./index.sass";

function EventsWidget({ events }) {
	const { upcomingEvents } = events;

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
