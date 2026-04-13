import { createBrowserRouter, redirect } from "react-router";
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
import { isAuthenticated } from "../utils/auth";
import loaders from "../services/loaders";
import actions from "../services/actions";

const authLoader = () => {
	if (isAuthenticated()) {
		return redirect("/");
	}
	return null;
};

const rootLoader = async () => {
	if (!isAuthenticated()) {
		return redirect("/auth/login");
	}
	const settings = await loaders.getSettings();
	return settings;
};

export const router = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		id: "root",
		loader: rootLoader,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				Component: Dashboard,
				loader: loaders.getDashboardData,
			},
			{
				path: "games",
				Component: Games,
				loader: loaders.getOwnGames,
				action: actions.gamesAction,
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
				action: actions.updateSettings,
			},
			// Seulement accessible par l'administrateur
			{
				path: "admin",
				children: [
					{
						index: true,
						loader: loaders.notFound,
					},
					{
						path: "messages",
						Component: AdminMessages,
						loader: loaders.getMessages,
					},
					{
						path: "members",
						Component: AdminMembers,
						loader: loaders.getMembers,
						action: actions.membersAction,
					},
				],
			},
			{
				path: "*",
				loader: loaders.notFound,
			},
		],
	},
	{
		path: "/auth",
		Component: AuthLayout,
		loader: authLoader,
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
]);
