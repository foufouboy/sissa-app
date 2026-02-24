export interface PrivateMessage {
	id: number;
	subject: string;
	body: string;
	info_type: string;
	message_type: "notification" | "email";
	created_at: Date;
}

export interface PublicMessage {
	id: number;
	subject: string;
	body: string;
	infoType: string;
	messageType: "notification" | "email";
	createdAt: Date;
}

export type CreateMessageInput = Omit<PublicMessage, "id" | "createdAt">;
