import CatNothing from "@/assets/nothing_cat.png";
import "./index.sass";

interface NothingCatProps {
	message?: string;
}

function NothingCat({
	message = "Il n'y a que Whiskey ! Il semble que ce soit quelque peu vide, par ici...",
}: NothingCatProps) {
	return (
		<div className="nothing-cat">
			<img src={CatNothing} alt="Cat Nothing" />
			<p>{message}</p>
		</div>
	);
}

export default NothingCat;
