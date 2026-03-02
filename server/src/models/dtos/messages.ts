import {
	PrivateMessage,
	PublicMessage,
	PrivateUserMessage,
	PublicUserMessage,
} from "../../types/messages";

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

export const toPublicUserMessage = (m: PrivateUserMessage): PublicUserMessage => {
	return {
		id: m.id,
		subject: m.subject,
		body: m.body,
		infoType: m.info_type,
		messageType: m.message_type,
		createdAt: m.created_at,
		recipientId: m.recipient_id,
		status: m.status,
		sentAt: m.sent_at,
		emailSent: m.email_sent,
	};
};

export const toPublicUserMessages = (
	messages: PrivateUserMessage[],
): PublicUserMessage[] => {
	return messages.map((m) => toPublicUserMessage(m));
};

