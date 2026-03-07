import type { PublicGame } from "./games";
import type { PublicEvent } from "./events";
import type { PublicUserMessage } from "./messages";

export interface GamesStatsWidget {
	totalGames: number;
	whiteWins: number;
	blackWins: number;
	draws: number;
	lastGameDate: Date | null;
	recentGames: PublicGame[];
}

export interface EventsWidget {
	upcomingEvents: PublicEvent[];
}

export interface MessagesWidget {
	unreadCount: number;
	recentMessages: PublicUserMessage[];
}

export interface CoachActivityWidget {
	totalStudents: number;
	activeStudentsLast7Days: number;
	gamesLast7Days: number;
}

export interface AdminUsersOverviewWidget {
	totalUsers: number;
	usersByRole: Record<string, number>;
}

export interface DashboardWidgets {
	games: GamesStatsWidget;
	events: EventsWidget;
	messages: MessagesWidget;
}

