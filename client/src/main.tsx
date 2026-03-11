import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./shared/routes/router";
import "./index.sass";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
