import { info } from "node:console";
import sgMail from "../config/sendGrid";
import { MessageModel } from "../models/messages.model";
import { MessageRecipientsModel } from "../models/messagesRecipients.model";
import { UserGroupsModel } from "../models/userGroups.model";
import { UserModel } from "../models/users.model";
import { CreateMessageInput } from "../types/messages";

export const messagesService = {
	async sendMailToUsers(messageData: CreateMessageInput, userIds: number[]) {
		try {
			const message = await MessageModel.create(messageData, userIds);

			if (messageData.messageType === "email") {
				const users = await UserModel.findByIds(userIds);
				const emails = users.map((user) => user.email);

				if (emails.length > 0) {
					await sgMail.sendMultiple({
						to: emails,
						from:
							process.env.SENDGRID_FROM_EMAIL ||
							"sissa.app.org@gmail.com",
						subject: messageData.subject,
						html: `<p> ${messageData.body} </p>`,
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
			const usersInGroup =
				await UserGroupsModel.findUsersByGroup(groupId);
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

	async sendNotificationToUsers(
		messageData: CreateMessageInput,
		userIds: number[],
	) {
		try {
			const message = await MessageModel.create(messageData, userIds);
			return message;
		} catch (error) {
			console.error(
				"Erreur messagesService.sendNotificationToUser:",
				error,
			);
			throw error;
		}
	},

	async sendNotificationToGroup(
		messageData: CreateMessageInput,
		groupId: number,
	) {
		try {
			const usersInGroup =
				await UserGroupsModel.findUsersByGroup(groupId);
			const userIds = usersInGroup.map((user) => user.id);
			const message = await this.sendMailToUsers(messageData, userIds);
			return message;
		} catch (error) {
			console.error(
				"Erreur messagesService.sendNotificationToGroup:",
				error,
			);
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

	async getAllFromGroup(groupId: number) {
		try {
			const usersInGroup =
				await UserGroupsModel.findUsersByGroup(groupId);
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

	async getMessageById(messageId: number) {
		try {
			const message = await MessageModel.findById(messageId);
			return message;
		} catch (error) {
			console.error("Erreur messagesService.getMessageById:", error);
			throw error;
		}
	},

	async getUnreadMessagesCount(userId: number) {
		try {
			const messages = await MessageRecipientsModel.findByUserId(userId);
			const unreadMessages = messages.filter(
				(message) => message.status !== "read",
			);
			return unreadMessages.length;
		} catch (error) {
			console.error(
				"Erreur messagesService.getUnreadMessagesCount:",
				error,
			);
			throw error;
		}
	},

	async markAsRead(recipientId: number) {
		try {
			await MessageRecipientsModel.updateOne(recipientId, "read");
		} catch (error) {
			console.error("Erreur messagesService.markAsRead:", error);
			throw error;
		}
	},

	async markAllAsRead(userId: number) {
		try {
			MessageRecipientsModel.updateManyByUser(userId, "read");
		} catch (error) {
			console.error("Erreur messagesService.markAllAsRead:", error);
		}
	},
};

// TESTS

async function main() {
	// Mark All As Read
	// await messagesService.markAllAsRead(1);
	//
	// Get unread count
	// const unreadCount = await messagesService.getUnreadMessagesCount(2);
	// console.log(unreadCount);
	//
	// Get message, from group, and for user
	// const message = await messagesService.getMessageById(1);
	// const messageGroup = await messagesService.getAllFromGroup(1);
	// const messagesOfUser = await messagesService.getAllFromUser(1);
	// console.log(messagesOfUser);
	//
	// Send notification to users
	// const messageData = {
	// 	subject: "Test notification",
	// 	body: "Ceci est une notification de test",
	// 	infoType: "admin",
	// 	messageType: "notification",
	// };
	// const message = await messagesService.sendNotificationToUsers(
	// 	messageData,
	// 	[1, 2]
	// );
	// console.log(message);
	//
	// SEND MAIL TO USERS
	//	const messageData = {
	//subject: "Test",
	//body: "Ceci est un test d'envoi de mail",
	//infoType: "admin",
	//messageType: "email",
	//};
	//const message = await messagesService.sendMailToUsers(messageData, [1]);
}

main();
