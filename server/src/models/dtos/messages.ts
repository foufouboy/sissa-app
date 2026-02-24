import { PrivateMessage, PublicMessage } from "../../types/messages";

export const toPublicMessage = (m: PrivateMessage): PublicMessage => {
	return {
		id: m.id,
		subject: m.subject,
		body: m.body,
		infoType: m.info_type,
		messageType: m.message_type,
		createdAt: m.created_at,
	};
};

export const toPublicMessages = (
	messages: PrivateMessage[],
): PublicMessage[] => {
	return messages.map((m) => toPublicMessage(m));
};

