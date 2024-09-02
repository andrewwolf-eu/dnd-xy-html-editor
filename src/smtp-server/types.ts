export interface EmailAttachment {
  filename: string;
  path: string;
  cid: string;
}

export interface EmailOptions {
  sender: string;
  recipient: string;
  title: string;
  body: string;
  attachments?: EmailAttachment[];
}
