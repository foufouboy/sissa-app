import { createBrowserRouter } from "react-router";
import {
	AdminMembers,
	AdminMessages,
	Dashboard,
	Events,
	Games,
	Login,
	Notifications,
	Profile,
	Register,
	Settings,
} from "../../pages";
import ErrorBoundary from "../components/ErrorBoundary";
import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout/";

export const router = createBrowserRouter([
	{
		// Seuls les utilisateurs connectés peuvent accéder à ce layout
		path: "/",
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: Dashboard,
			},
			{
				path: "games",
				Component: Games,
				children: [
					{
						path: ":gameId",
						Component: Games,
					},
				],
			},
			{
				path: "events",
				Component: Events,
				children: [
					{
						path: "detail/:eventId",
						Component: Events,
					},
				],
			},
			{
				path: "notifications",
				Component: Notifications,
				children: [
					{
						path: "detail/:notificationId",
						Component: Notifications,
					},
				],
			},
			{
				path: "profile",
				Component: Profile,
			},
			{
				path: "settings",
				Component: Settings,
			},
			// Seulement accessible par l'administrateur
			{
				path: "admin",
				children: [
					{
						path: "messages",
						Component: AdminMessages,
					},
					{
						path: "members",
						Component: AdminMembers,
					},
				],
			},
		],
	},
	{
		path: "/auth",
		Component: AuthLayout,
		children: [
			{
				path: "login",
				Component: Login,
			},
			{
				path: "register",
				Component: Register,
			},
		],
	},
	{
		path: "*",
		Component: ErrorBoundary,
	},
]);
