export interface Event {
    id: number;
    location: string;
    start_date: Date;
    end_date: Date;
    all_day: boolean;
    title: string;
    description: string;
}

export type CreateEventInput = Omit<Event, "created_at" | "id">;
export type EventPublic = Event;