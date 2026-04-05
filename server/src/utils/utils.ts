import { Chess } from "chess.js";

export const postgresAggregationToArray = (aggregation: string): string[] => {
	return aggregation
		.substring(1, aggregation.length - 1)
		.split(",")
		.map((item) => item.trim());
};

export const isValidPgn = (pgn: string): boolean => {
	const chess = new Chess();
	try {
		chess.loadPgn(pgn);
		return true;
	} catch {
		return false;
	}
};

export const getRoleName = (role: string): string => {
	return role === "admin"
		? "Administrateur"
		: role === "teacher"
			? "Professeur"
			: "Membre";
};
