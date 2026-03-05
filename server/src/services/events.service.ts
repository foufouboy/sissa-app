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
import { CreateEventInput } from "../types/events";

export const eventsService = {
  async getEventDetail(eventId: number) {
    try {
      const event = await EventModel.findById(eventId);
      return event;
    } catch (error) {
      console.error("Erreur eventsService.getEventDetail:", error);
      throw error;
    }
  },

  async getAllEvents() {
    try {
      const events = await EventModel.findAll();
      return events;
    } catch (error) {
      console.error("Erreur eventsService.getAllEvents:", error);
      throw error;
    }
  },

  async getUserEvents(userId: number) {
    try {
      const userWithGroups = await UserGroupsModel.findUserById(userId);
      const groupIds = userWithGroups.groups.map((group) => group.id);
      console.log(groupIds);
      const events = await EventModel.findByGroups(groupIds);
      return events;
    } catch (error) {
      console.error("Erreur eventsService.getUserEvents:", error);
      throw error;
    }
  },

  async getGroupsEvents(groupIds: number[]) {
    try {
      const events = await EventModel.findByGroups(groupIds);
      return events;
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
