import { MessageModel } from "../models/messages.model";
import { MessageRecipientsModel } from "../models/messagesRecipients.model";
import { UserGroupsModel } from "../models/userGroups.model";
import { CreateMessageInput } from "../types/messages";

export const messagesService = {
  async markAsRead(recipientId: number) {
    try {
      await MessageRecipientsModel.updateOne(recipientId, "read");
    } catch (error) {
      console.error("Erreur messagesService.markAsRead:", error);
      throw error;
    }
  },

  async getInboxOfUser(userId: number) {
    try {
      const messages = await MessageModel.findByUserWithStatus(userId);
      return messages;
    } catch (error) {
      console.error("Erreur messagesService.getInboxOfUser:", error);
      throw error;
    }
  },

  async getAllFromUser(userId: number) {
    try {
      const messages = await MessageModel.findByUsers([userId]);
      return messages;
    } catch (error) {
      console.error("Erreur messagesService.getAllFromUser:", error);
      throw error;
    }
  },

  async getAllFromGroup(groupId: string) {
    // bon
    try {
      const usersInGroup = await UserGroupsModel.findUsersByGroup(groupId);
      const userIds = usersInGroup.map((user) => user.id);

      if (userIds.length === 0) {
        return [];
      }

      const messages = await MessageModel.findByUsers(userIds);
      return messages;
    } catch (error) {
      console.error("Erreur messagesService.getAllFromGroup:", error);
      throw error;
    }
  },

  async sendMailToUsers(messageData: CreateMessageInput, userIds: number[]) {
    // on utililsera le service de mail pour envoyer le mail
    try {
      const message = await MessageModel.create(messageData, userIds);
      return message;
    } catch (error) {
      console.error("Erreur messagesService.sendMailToUsers:", error);
      throw error;
    }
  },

  async sendMailToGroup(messageData: CreateMessageInput, groupId: string) {
    // on utililsera le service de mail pour envoyer le mail
    try {
      const usersInGroup = await UserGroupsModel.findUsersByGroup(groupId);
      const userIds = usersInGroup.map((user) => user.id);

      if (userIds.length === 0) {
        throw new Error("Aucun utilisateur dans ce groupe");
      }

      const message = await this.sendMailToUsers(messageData, userIds);
      return message;
    } catch (error) {
      console.error("Erreur messagesService.sendMailToGroup:", error);
      throw error;
    }
  },

  async getMessageById(messageId: number) {
    // bon
    try {
      const message = await MessageModel.findById(messageId);
      return message;
    } catch (error) {
      console.error("Erreur messagesService.getMessageById:", error);
      throw error;
    }
  },
};
