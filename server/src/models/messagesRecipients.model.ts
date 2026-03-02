import { query } from "../config/db";
import { PrivateMessageRecipient } from "../types/messagesRecipients";

export const MessageRecipientsModel = {
  async updateOne(id: number, status: "read" | "sent" | "failed") {
    try {
      await query(`UPDATE message_recipients SET status = $1 WHERE id = $2`, [
        status,
        id,
      ]);
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du message ${id} comme lu:`,
        error,
      );
      throw error;
    }
  },

  async updateMany(ids: number[], status: "read" | "sent" | "failed") {
    try {
      await query(
        `UPDATE message_recipients SET status = $1 WHERE id = ANY($2)`,
        [status, ids],
      );
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour des message recipients ${ids}:`,
        error,
      );
      throw error;
    }
  },

  async findById(id: number) {
    try {
      const result = await query<PrivateMessageRecipient>(
        `SELECT * FROM message_recipients WHERE id = $1`,
        [id],
      );
      return result;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du message recipient ${id}:`,
        error,
      );
      throw error;
    }
  },
};
