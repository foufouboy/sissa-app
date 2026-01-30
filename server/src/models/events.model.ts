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

    },

    async create(data: CreateEventInput) {

    },

    async update(data: CreateEventInput) {

    },

    async delete(id: CreateEventInput) {

    }
}