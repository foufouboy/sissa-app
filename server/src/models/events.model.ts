import { query } from "../config/db";
import { CreateEventInput, EventPublic, EventWithCreator } from "../types/events";
import { toPublicEvent, toPublicEvents } from "./dtos/events";

export const EventModel = {
    async findAll(): Promise<EventPublic[]> {
        try {
            const events = await query<EventWithCreator>(`
                SELECT * FROM events_with_creator
            `);

            return toPublicEvents(events);
        } catch (error) {
            console.error("Erreur lors de la récupération des évènements:", error);
            throw error;
        }
    },

    async findByGroup(id: number): Promise<EventPublic[]> {

    },

    async findById(id: number): Promise<EventPublic> {
        try {
            const result = await query<EventWithCreator>(`
                SELECT * FROM events_with_creator
                WHERE event_id = $1
            `, [id]);

            if (!result[0]) {
                throw new Error("Évènement non trouvé");
            }

            return toPublicEvent(result[0]);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'évènement:", error);
            throw error;
        }
    },

    async create(data: CreateEventInput) {
        const { location, start_date, end_date, all_day, title, description, created_by } = data;
        try {
            return await query(`
                INSERT INTO events (location, start_date, end_date, all_day, title, description, created_by)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [location, start_date, end_date, all_day, title, description, created_by]);
        } catch(error) {
            console.log("Erreur lors de la création de l'évènement:", error);
            throw error;
        }
    },

    async update(id: number, data: CreateEventInput) {
        const { location, start_date, end_date, all_day, title, description, created_by } = data;
        try {
            return await query(`
                UPDATE events 
                SET location = $2, 
                    start_date = $3, 
                    end_date = $4, 
                    all_day = $5, 
                    title = $6, 
                    description = $7,
                    created_by = $8,
                    updated_at = NOW()
                WHERE id = $1
            `, [id, location, start_date, end_date, all_day, title, description, created_by]);
        } catch(error) {
            console.log("Erreur lors de la modification de l'évènement:", error);
            throw error;
        }
    },

    async delete(id: number) {
        try {
            return await query(`DELETE FROM events WHERE id = $1`, [id]);
        } catch(error) {
            console.log("Erreur lors de la suppression de l'évènement:", error);
            throw error;
        }
    }
}


// TESTS 

async function main() {

    const event = await EventModel.findAll();

    console.log(event);
}

main();