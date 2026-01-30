import { UserPublic } from "./users";

// TODO : Créer des EntityPublic VRAIMENT utilisables par le service

export interface Event {
    id: number;
    created_by: number;
    location: string;
    start_date: Date;
    end_date: Date;
    all_day: boolean;
    title: string;
    description: string;
    created_at: Date;
}

export interface EventWithCreator extends Omit<Event, "created_by"> {
    creator: UserPublic;
}

export type CreateEventInput = Omit<Event, "created_at" | "id">;
export type EventPublic = EventWithCreator;