import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import CatNothing from "@/assets/nothing_cat.png";
import "./index.sass";

function EventsWidget() {
	return (
		<GenericCard title="Événements à venir" className="events-widget">
			<div className="generic-card-content">
				<img src={CatNothing} alt="Cat Nothing" />
				<p>
					Il n'y a que Whiskey ! Il semble que ce soit quelque peu
					vide, par ici...
				</p>
			</div>
		</GenericCard>
	);
}

export default EventsWidget;
