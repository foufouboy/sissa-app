import { Outlet } from "react-router";
import Footer from "../Footer";
import Header from "../Header";
import "./index.sass";

function AppLayout() {
	return (
		<div className="app-layout">
			<Header />
			<main>
				<div className="page-title">
					<h2>Dashboard</h2>
				</div>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default AppLayout;
