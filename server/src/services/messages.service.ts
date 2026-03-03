import { MessageModel } from "../models/messages.model";
import { MessageRecipientsModel } from "../models/messagesRecipients.model";
import { UserGroupsModel } from "../models/userGroups.model";
import { UserModel } from "../models/users.model";
import { CreateMessageInput } from "../types/messages";
import sgMail from "../config/sendGrid";

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
    try {
      const message = await MessageModel.create(messageData, userIds);

      if (messageData.messageType === "email") {
        const users = await UserModel.findByIds(userIds);
        const emails = users.map((user) => user.email);

        if (emails.length > 0) {
          await sgMail.sendMultiple({
            to: emails,
            from: process.env.SENDGRID_FROM_EMAIL || "noreply@sissa.com",
            subject: messageData.subject,
            html: messageData.body,
          });
        }
      }

      return message;
    } catch (error) {
      console.error("Erreur messagesService.sendMailToUsers:", error);
      throw error;
    }
  },

  async sendMailToGroup(messageData: CreateMessageInput, groupId: string) {
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
