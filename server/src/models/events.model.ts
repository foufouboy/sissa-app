import { query } from "../config/db";
import { CreateEventInput, EventWithDetails } from "../types/events";

export const EventModel = {
  async findAll(): Promise<EventWithDetails[]> {
    try {
      const events = await query<EventWithDetails>(`
                SELECT * FROM events_complete_details
            `);

      return events;
    } catch (error) {
      console.error("Erreur lors de la récupération des évènements:", error);
      throw error;
    }
  },

  async findByGroups(ids: number[]): Promise<EventWithDetails[]> {
    try {
      const events = await query<EventWithDetails>(
        `
                SELECT * FROM events_complete_details
                WHERE member_group_ids && $1::bigint[]
            `,
        [ids],
      );

      return events;
    } catch (error) {
      console.error("Erreur lors de la récupération des évènements:", error);
      throw error;
    }
  },

  async findById(id: number): Promise<EventWithDetails> {
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

      return result[0];
    } catch (error) {
      console.error("Erreur lors de la récupération de l'évènement:", error);
      throw error;
    }
  },

  async create(data: CreateEventInput) {
    const {
      location,
      startDate,
      endDate,
      allDay,
      title,
      description,
      memberGroupsIds,
    } = data;

    // Actuellement, le créateur est hardcodé à 1 (admin) car nous n'en avons aucune utilité
    try {
      return await query(
        `
                CALL create_event_with_groups(
                    $1, $2, $3, $4, $5, $6, 1, $7
                )
            `,
        [
          location,
          startDate,
          endDate,
          allDay,
          title,
          description,
          memberGroupsIds,
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
      startDate,
      endDate,
      allDay,
      title,
      description,
      memberGroupsIds,
    } = data;
    try {
      return await query(
        `
                CALL update_event_with_groups(
                    $1, $2, $3, $4, $5, $6, $7, 1, $8
                )
            `,
        [
          id,
          location,
          startDate,
          endDate,
          allDay,
          title,
          description,
          memberGroupsIds,
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
