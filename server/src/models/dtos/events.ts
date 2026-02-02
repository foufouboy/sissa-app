import { EventPublic, EventWithCreator } from "../../types/events";

export const toPublicEvent = (e: EventWithCreator): EventPublic => {
    return {
        id: e.event_id,
        location: e.location,
        startDate: e.start_date,
        endDate: e.end_date,
        allDay: e.all_day,
        title: e.title,
        description: e.description,
        createdAt: e.created_at,
        updatedAt: e.updated_at,
        user: {
            id: e.user_id,
            email: e.email,
            firstName: e.first_name,
            lastName: e.last_name,
        }
    }
}

export const toPublicEvents = (events: EventWithCreator[]): EventPublic[] => {
    return events.map(e => toPublicEvent(e));
}