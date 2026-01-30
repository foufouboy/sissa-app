import { query } from "../config/db";
import { CreateEventInput, Event, EventPublic } from "../types/events";

export const EventModel = {
    async findAll(): Promise<EventPublic[]> {
        try {
            const results = await query<Event>(`
                SELECT * FROM events_with_creator
            `);

            const publicEvents = results.map(e => {
                // on map pour avoir EventWithCreator, puis on retourne
            })

            return publicEvents;
        } catch (error) {
            console.error("Erreur lors de la récupération des évènements:", error);
            throw error;
        }
    },

    async findByGroup(id: number): Promise<EventPublic[]> {

    },

    async findById(id: number): Promise<Event> {
        try {
            const result = await query<Event>(`
                SELECT * FROM event_with_user
                WHERE event_id = $1
            `, [id]);

            const { 
                event_id, location, start_date, 
                end_date, all_day, title, description, 
                created_at, updated_at, user_id, email,
                first_name, last_name } 
            = result;

            const event: EventPublic = {
                id: event_id,
                location,
                start_date,
                end_date,
                all_day,
                title,
                description,
                created_at,
                creator: {
                    id: user_id,
                    email,
                    first_name,
                    last_name,
                }
            }

            return event;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'évènement:", error);
            throw error;
        }
    },

    async create(data: CreateEventInput) {

    },

    async update(data: CreateEventInput) {

    },

    async delete(id: CreateEventInput) {

    }
}


// TESTS 

async function main() {

    const event = await EventModel.findById(1);

    console.log(event);
}

main();