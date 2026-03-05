import { query } from "../config/db";
import {
  CreateEventInput,
  EventWithDetails,
  PublicEvent,
} from "../types/events";
import { toPublicEvent, toPublicEvents } from "./dtos/events";

export const EventModel = {
  async findAll(): Promise<PublicEvent[]> {
    try {
      const events = await query<EventWithDetails>(`
                SELECT * FROM events_complete_details
            `);

      return toPublicEvents(events);
    } catch (error) {
      console.error("Erreur lors de la récupération des évènements:", error);
      throw error;
    }
  },

  async findByGroups(ids: number[]): Promise<PublicEvent[]> {
    try {
      const events = await query<EventWithDetails>(
        `
                SELECT * FROM events_complete_details
                WHERE member_group_ids && $1::bigint[]
            `,
        [ids],
      );

      return toPublicEvents(events);
    } catch (error) {
      console.error("Erreur lors de la récupération des évènements:", error);
      throw error;
    }
  },

  async findById(id: number): Promise<PublicEvent> {
    try {
      const result = await query<EventWithDetails>(
        `
                SELECT * FROM events_complete_details
                WHERE event_id = $1
            `,
        [id],
      );

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
    const {
      location,
      start_date,
      end_date,
      all_day,
      title,
      description,
      created_by,
      member_groups_ids,
    } = data;
    try {
      return await query(
        `
                CALL create_event_with_groups(
                    $1, $2, $3, $4, $5, $6, $7, $8
                )
            `,
        [
          location,
          start_date,
          end_date,
          all_day,
          title,
          description,
          created_by,
          member_groups_ids,
        ],
      );
    } catch (error) {
      console.log("Erreur lors de la création de l'évènement:", error);
      throw error;
    }
  },

  async update(id: number, data: CreateEventInput) {
    const {
      location,
      start_date,
      end_date,
      all_day,
      title,
      description,
      created_by,
      member_groups_ids,
    } = data;
    try {
      return await query(
        `
                CALL update_event_with_groups(
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                )
            `,
        [
          id,
          location,
          start_date,
          end_date,
          all_day,
          title,
          description,
          created_by,
          member_groups_ids,
        ],
      );
    } catch (error) {
      console.log("Erreur lors de la modification de l'évènement:", error);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      return await query(`DELETE FROM events WHERE id = $1`, [id]);
    } catch (error) {
      console.log("Erreur lors de la suppression de l'évènement:", error);
      throw error;
    }
  },
};

// TESTS

async function main() {
  const event = await EventModel.create({
    location: "Brec'h",
    start_date: new Date(),
    end_date: new Date(),
    all_day: false,
    title: "Blabla",
    description: "Blabla",
    created_by: 1,
    member_groups_ids: [1, 2],
  });

  console.log(event);
}
