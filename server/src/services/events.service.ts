/**
 * - Récupérer le détail d'un évènement
 * - Récupérer tous les évènements
 * - Récupérer tous les évènements concernant un user
 * - Récupérer tous les évènements d'un groupe
 * - Créer un évent
 * - Modifier un évent
 * - Supprimer un évent
 */

import { EventModel } from "../models/events.model";
import { UserGroupsModel } from "../models/userGroups.model";
import { CreateEventInput, PublicEvent } from "../types/events";
import { toPublicEvent, toPublicEvents } from "../models/dtos/events";

export const eventsService = {
  async getEventDetail(eventId: number): Promise<PublicEvent> {
    try {
      const event = await EventModel.findById(eventId);
      return toPublicEvent(event);
    } catch (error) {
      console.error("Erreur eventsService.getEventDetail:", error);
      throw error;
    }
  },

  async getAllEvents(): Promise<PublicEvent[]> {
    try {
      const events = await EventModel.findAll();
      return toPublicEvents(events);
    } catch (error) {
      console.error("Erreur eventsService.getAllEvents:", error);
      throw error;
    }
  },

  async getUserEvents(userId: number): Promise<PublicEvent[]> {
    try {
      const userWithGroups = await UserGroupsModel.findUserById(userId);
      const groupIds = userWithGroups.groups.map((group) => group.id);
      const events = await EventModel.findByGroups(groupIds);
      return toPublicEvents(events);
    } catch (error) {
      console.error("Erreur eventsService.getUserEvents:", error);
      throw error;
    }
  },

  async getGroupsEvents(groupIds: number[]): Promise<PublicEvent[]> {
    try {
      const events = await EventModel.findByGroups(groupIds);
      return toPublicEvents(events);
    } catch (error) {
      console.error("Erreur eventsService.getGroupsEvents:", error);
      throw error;
    }
  },

  async createEvent(data: CreateEventInput) {
    try {
      return await EventModel.create(data);
    } catch (error) {
      console.error("Erreur eventsService.createEvent:", error);
      throw error;
    }
  },

  async updateEvent(eventId: number, data: CreateEventInput) {
    try {
      return await EventModel.update(eventId, data);
    } catch (error) {
      console.error("Erreur eventsService.updateEvent:", error);
      throw error;
    }
  },

  async deleteEvent(eventId: number) {
    try {
      await EventModel.delete(eventId);
    } catch (error) {
      console.error("Erreur eventsService.deleteEvent:", error);
      throw error;
    }
  },
};

// TESTS

async function main() {
  await eventsService.createEvent({
    location: "Brec'h",
    start_date: new Date(),
    end_date: new Date(),
    all_day: false,
    title: "Blabla",
    description: "Blabla",
    created_by: 1,
    member_groups_ids: [1, 2],
  });
}

main();
