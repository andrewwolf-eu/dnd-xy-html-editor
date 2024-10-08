export interface SMTPConfig {
  host: string;
  username: string;
  password: string;
  port: string;
  secure: boolean;
  from: string;
}

export interface ToSend {
  recipient: string;
  title: string;
  htmlBody: string;
  plainTextBody: string;
  cidBasedImageEmbedding: boolean;
}

export interface EmailFormProps {
  open: boolean;
  onClose: () => void;
}
