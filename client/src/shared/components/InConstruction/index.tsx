import CatFood from "@/assets/cat_food.png";
import "./index.sass";

interface InConstructionProps {
	title?: string;
	message?: string;
}

function InConstruction({
	title = "Page en construction",
	message = "Nos agents félins sont sur le coup !",
}: InConstructionProps) {
	return (
		<div className="in-construction">
			<div className="in-construction-content">
				<img
					src={CatFood}
					alt="Chat en construction"
					className="in-construction-image"
				/>
				<h2 className="in-construction-title">{title}</h2>
				<p className="in-construction-message">{message}</p>
			</div>
		</div>
	);
}

export default InConstruction;
