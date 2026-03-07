/**
 * MessageModel.findAll() // check
 * MessageModel.findByUsers() // check. prend un tableau d'id d'users pour les groupes aussi
 * MessageModel.findById()
 * MessageModel.findByType()
 *
 * MessageModel.create()
 *
 * MessageModel.delete()
 *
 */

import {
	CreateMessageInput,
	PrivateMessage,
	PrivateUserMessage,
} from "../types/messages";
import { pool, query } from "../config/db";

export const MessageModel = {
	async create(
		messageData: CreateMessageInput,
		userIds: number[],
	): Promise<PrivateMessage> {
		const client = await pool.connect();

		try {
			await client.query("BEGIN");

			const { subject, body, infoType, messageType } = messageData;

			const insertResult = await client.query<PrivateMessage>(
				`INSERT INTO messages (subject, body, info_type, message_type)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
				[subject, body, infoType, messageType]
			);

			const newMessage = insertResult.rows[0];

			if (!newMessage)
				throw new Error("TRANSACTION: Erreur pendant l'insertion");

			if (userIds.length > 0) {
				await client.query(
					`INSERT INTO message_recipients (message_id, user_id, status)
                     SELECT $1, UNNEST($2::int[]), 'sent'`,
					[newMessage.id, userIds]
				);
			}

			await client.query("COMMIT");

			return newMessage;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error(
				"Erreur lors de la création du message pour les utilisateurs:",
				error
			);
			throw error;
		} finally {
			client.release();
		}
	},

	async findAll(): Promise<PrivateMessage[]> {
		try {
			const result = await query<PrivateMessage>(`SELECT * FROM messages`);
			return result;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages:",
				error
			);
			throw error;
		}
	},

	async findById(id: number): Promise<PrivateMessage> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT * FROM messages WHERE id = $1
                 LIMIT 1`,
				[id],
			);

			if (!result[0]) {
				throw new Error("Message non trouvé");
			}

			return result[0];
		} catch (error) {
			console.error(
				`Erreur lors de la récupération du message ${id}:`,
				error
			);
			throw error;
		}
	},

	async findByType(
		type: "notification" | "email",
	): Promise<PrivateMessage[]> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT * FROM messages WHERE message_type = $1`,
				[type],
			);
			return result;
		} catch (error) {
			console.error(
				`Erreur lors de la récupération des messages de type ${type}:`,
				error
			);
			throw error;
		}
	},

	async findByUsers(userIds: number[]): Promise<PrivateMessage[]> {
		try {
			const result = await query<PrivateMessage>(
				`SELECT m.* FROM messages m
                 JOIN message_recipients mr ON m.id = mr.message_id
                 WHERE mr.user_id = ANY($1)
                 GROUP BY m.id`,
				[userIds],
			);
			return result;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages par utilisateurs:",
				error
			);
			throw error;
		}
	},

	async findByUserWithStatus(
		userId: number,
	): Promise<PrivateUserMessage[]> {
		try {
			const result = await query<PrivateUserMessage>(
				`SELECT 
					m.id, m.subject, m.body, m.info_type, m.message_type, m.created_at,
					mr.id as recipient_id, mr.status, mr.sent_at, mr.email_sent
				FROM messages m
				JOIN message_recipients mr ON m.id = mr.message_id
				WHERE mr.user_id = $1
				ORDER BY mr.sent_at DESC`,
				[userId],
			);
			return result;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages avec statut:",
				error
			);
			throw error;
		}
	},

	async delete(id: number): Promise<void> {
		try {
			await query(`DELETE FROM messages WHERE id = $1`, [id]);
		} catch (error) {
			console.error(
				`Erreur lors de la suppression du message ${id}:`,
				error
			);
			throw error;
		}
	},
};
