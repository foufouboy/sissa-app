import "./index.sass";

interface EventListItemProps {
	title: string;
	description: string;
	startDate: string;
	location: string;
	allDay: boolean;
}

function EventListItem({
	title,
	description,
	startDate,
	location,
	allDay,
}: EventListItemProps) {
	const eventDate = new Date(startDate);
	const day = eventDate.getDate();
	const month = eventDate.toLocaleDateString("fr-FR", { month: "short" });
	const time = eventDate.toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className="event-item">
			<div className="event-date-badge">
				<span className="event-day">{day}</span>
				<span className="event-month">{month}</span>
			</div>
			<div className="event-details">
				<h4 className="event-title">{title}</h4>
				<p className="event-description">{description}</p>
				<div className="event-meta">
					<span className="event-time-badge">
						{allDay ? "Toute la journée" : time}
					</span>
					<span className="event-location">{location}</span>
				</div>
			</div>
		</div>
	);
}

export default EventListItem;
