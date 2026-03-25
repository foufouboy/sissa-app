import { Outlet } from "react-router";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import "./index.sass";

function AppLayout() {
	return (
		<div className="app-layout">
			<Header />
			<main>
				<Outlet />
			</main>
			<Nav />
			<Footer />
		</div>
	);
}

export default AppLayout;
