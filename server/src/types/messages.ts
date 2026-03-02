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

export interface PrivateUserMessage extends PrivateMessage {
  recipient_id: number;
  status: string;
  sent_at: Date;
  email_sent: boolean;
}

export interface PublicUserMessage extends PublicMessage {
  recipientId: number;
  status: string;
  sentAt: Date;
  emailSent: boolean;
}
