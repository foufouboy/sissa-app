export interface PrivateMessageRecipient {
  id: number;
  user_id: number;
  message_id: number;
  status: string;
  sent_at: Date;
  email_sent: boolean;
}

export interface PublicMessageRecipient {
  id: number;
  userId: number;
  messageId: number;
  status: string;
  sentAt: Date;
  emailSent: boolean;
}
