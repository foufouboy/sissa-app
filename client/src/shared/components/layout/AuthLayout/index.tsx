import { Outlet } from "react-router";
import "./index.sass";

function AuthLayout() {
	return (
		<div className="auth-layout">
			<Outlet />
		</div>
	);
}

export default AuthLayout;
