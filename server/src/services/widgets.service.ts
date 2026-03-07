import { UserModel } from "../models/users.model";
import { eventsService } from "./events.service";
import { gamesService } from "./games.service";
import { messagesService } from "./messages.service";
import type {
	GamesStatsWidget,
	EventsWidget,
	MessagesWidget,
	CoachActivityWidget,
	AdminUsersOverviewWidget,
	DashboardWidgets,
} from "../types/widgets";

export const widgetsService = {
	async getGamesWidget(userId: number): Promise<GamesStatsWidget> {
		const games = await gamesService.getGamesOfUser(userId);

		const totalGames = games.length;

		let whiteWins = 0;
		let blackWins = 0;
		let draws = 0;

		for (const game of games) {
			const result = game.result.toLowerCase();
			if (result.includes("1-0") || result === "white_win") {
				whiteWins += 1;
			} else if (result.includes("0-1") || result === "black_win") {
				blackWins += 1;
			} else if (result.includes("1/2-1/2") || result === "draw") {
				draws += 1;
			}
		}

		const sortedByDate = [...games].sort(
			(a, b) => b.gameDate.getTime() - a.gameDate.getTime(),
		);

		const lastGameDate = sortedByDate[0]?.gameDate ?? null;
		const recentGames = sortedByDate.slice(0, 5);

		return {
			totalGames,
			whiteWins,
			blackWins,
			draws,
			lastGameDate,
			recentGames,
		};
	},

	async getEventsWidget(userId: number): Promise<EventsWidget> {
		const events = await eventsService.getUserEvents(userId);

		const now = new Date();
		const upcomingEvents = events
			.filter((event) => event.endDate >= now)
			.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
			.slice(0, 5);

		return { upcomingEvents };
	},

	async getMessagesWidget(userId: number): Promise<MessagesWidget> {
		const [unreadCount, messages] = await Promise.all([
			messagesService.getUnreadMessagesCount(userId),
			messagesService.getInboxOfUser(userId),
		]);

		const recentMessages = messages.slice(0, 5);

		return {
			unreadCount,
			recentMessages,
		};
	},

	async getDashboardWidgets(userId: number): Promise<DashboardWidgets> {
		const [games, events, messages] = await Promise.all([
			this.getGamesWidget(userId),
			this.getEventsWidget(userId),
			this.getMessagesWidget(userId),
		]);

		return {
			games,
			events,
			messages,
		};
	},

	async getCoachActivityWidget(
		teacherId: number,
		days = 7,
	): Promise<CoachActivityWidget> {
		const students = await UserModel.findStudentsOf(teacherId);
		const totalStudents = students.length;

		if (totalStudents === 0) {
			return {
				totalStudents: 0,
				activeStudentsLast7Days: 0,
				gamesLast7Days: 0,
			};
		}

		const now = new Date();
		const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

		const gamesPerStudent = await Promise.all(
			students.map((student) => gamesService.getGamesOfUser(student.id)),
		);

		let activeStudentsLast7Days = 0;
		let gamesLast7Days = 0;

		for (const games of gamesPerStudent) {
			const recentGames = games.filter(
				(game) => game.gameDate >= threshold,
			);

			if (recentGames.length > 0) {
				activeStudentsLast7Days += 1;
				gamesLast7Days += recentGames.length;
			}
		}

		return {
			totalStudents,
			activeStudentsLast7Days,
			gamesLast7Days,
		};
	},

	async getAdminUsersOverviewWidget(): Promise<AdminUsersOverviewWidget> {
		const users = await UserModel.findAll();

		const totalUsers = users.length;
		const usersByRole: Record<string, number> = {};

		for (const user of users) {
			const roleKey = String(user.role);
			usersByRole[roleKey] = (usersByRole[roleKey] || 0) + 1;
		}

		return {
			totalUsers,
			usersByRole,
		};
	},
};

// TESTS

async function main() {
	const adminUsersOverview =
		await widgetsService.getAdminUsersOverviewWidget();
	const widgets = await widgetsService.getDashboardWidgets(1);

	console.log(adminUsersOverview, widgets);
}

main();
