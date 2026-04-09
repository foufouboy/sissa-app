import loadingCat from "@/assets/loading_cat.gif";
import "./index.sass";

function PageLoader() {
	return (
		<div className="page-loader">
			<img
				className="page-loader__gif"
				src={loadingCat}
				alt="Chargement..."
			/>
		</div>
	);
}

export default PageLoader;
