
export type Sender = 'user' | 'bot';

export interface Attachment {
  name: string;
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
  quickReplies?: string[];
  attachment?: Attachment;
}