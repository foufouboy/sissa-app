import { query } from "../config/db";
import { CreateGameInput, Game } from "../types/games";

export const GameModel = {
    async findAllGamesOfPlayer(userId: number): Promise<Game[]> {
        // TODO
    },

    async findById(id: number): Promise<Game | undefined> {
        // TODO 
        const result = (await query<Game>(
            `SELECT * FROM games WHERE id = $1
            LIMIT 1`,
            [id]
        ));

        return result[0];
    },

    async create(data: CreateGameInput) {
        // TODO
    },

    async delete(id: number) {
        // TODO
    }
};