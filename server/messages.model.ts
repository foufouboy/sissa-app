/**
 * MessageModel.findAll() // check
 * MessageModel.findByUsers() // check. prend un tableau d'id d'users pour les groupes aussi
 * MessageModel.findById()
 * MessageModel.findByType()
 *
 * MessageModel.create()
 * MessageModel.createForUsers() // permet de créer pour des groupes ET des users
 *
 * MessageModel.delete()
 *
 */

import { PrivateMessage, PublicMessage } from "../types/messages";
import { query } from "../config/db";
import { toPublicMessage, toPublicMessages } from "./dtos/messages";

export const MessageModel = {
	async findAll(): Promise<PublicMessage[]> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT * FROM messages`
			);
			return toPublicMessages(result);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages:",
				error
			);
			throw error;
		}
	},

	async findById(id: number): Promise<PublicMessage> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT * FROM messages WHERE id = $1
                 LIMIT 1`,
				[id]
			);

			if (!result[0]) {
				throw new Error("Message non trouvé");
			}

			return toPublicMessage(result[0]);
		} catch (error) {
			console.error(
				`Erreur lors de la récupération du message ${id}:`,
				error
			);
			throw error;
		}
	},

	async findByType(type: "notification" | "email"): Promise<PublicMessage[]> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT * FROM messages WHERE message_type = $1`,
				[type]
			);
			return toPublicMessages(result);
		} catch (error) {
			console.error(
				`Erreur lors de la récupération des messages de type ${type}:`,
				error
			);
			throw error;
		}
	},

	async findByUsers(userIds: number[]): Promise<PublicMessage[]> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT m.* FROM messages m
                 JOIN message_recipients mr ON m.id = mr.message_id
                 WHERE mr.user_id = ANY($1)
                 GROUP BY m.id`,
				[userIds]
			);
			return toPublicMessages(result);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages par utilisateurs:",
				error
			);
			throw error;
		}
	},

	async create(messageData: PublicMessage, userIds: number[]) {
		try {
			const { subject, body, infoType, messageType } = messageData;
			const result = await query<PrivateMessage>(
				`INSERT INTO messages (subject, body, info_type, message_type) VALUES ($1, $2, $3, $4) RETURNING *`,
				[subject, body, infoType, messageType]
			);
			const newMessage = result[0];

			for (const userId of userIds) {
				await query(
					`INSERT INTO message_recipients (message_id, user_id) VALUES ($1, $2)`,
					[newMessage.id, userId]
				);
			}

			return toPublicMessage(newMessage);
		} catch (error) {
			console.error(
				"Erreur lors de la création du message pour les utilisateurs:",
				error
			);
			throw error;
		}
	},
};

// TESTS

async function main() {
	const messagesByUsers = await MessageModel.findByUsers([4, 5]);
	console.log(messagesByUsers);
}

main();
