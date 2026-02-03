
export interface Event {
    id: number;
    created_by: number;
    location: string;
    start_date: Date;
    all_day: boolean;
    end_date: Date;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface EventPublic {
    id: number;
    location: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    }
    groups: string[];
};

export type EventWithDetails = Omit<Event, "id"> & {
    event_id: number;
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    member_group_ids: number[];
    member_group_names: string;
}


export type CreateEventInput = Omit<Event, "created_at" | "id"> & {
    member_groups_ids: number[];
};
