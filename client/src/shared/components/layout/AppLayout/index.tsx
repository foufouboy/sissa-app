import { Outlet, useRouteLoaderData } from "react-router";
import { useEffect } from "react";
import Header from "../Header/";
import Nav from "../Nav";
import Footer from "../Footer";
import "./index.sass";

function AppLayout() {
	const { settings } = useRouteLoaderData("root") as {
		settings: { darkMode: boolean };
	};

	useEffect(() => {
		document.documentElement.dataset.theme = settings.darkMode
			? "dark"
			: "light";
		return () => {
			document.documentElement.removeAttribute("data-theme");
		};
	}, [settings.darkMode]);

	return (
		<div className="app-layout">
			<Header />
			<main className="app-layout__main">
				<Outlet />
			</main>
			<Nav />
			<Footer />
		</div>
	);
}

export default AppLayout;
