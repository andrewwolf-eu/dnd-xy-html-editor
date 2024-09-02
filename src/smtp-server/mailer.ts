import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { EmailOptions } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: options.sender || process.env.SMTP_USER,
    to: options.recipient,
    subject: options.title,
    text: options.body,
    html: options.body,
    attachments: options.attachments?.map((file) => ({
      filename: file.filename,
      path: file.path,
      cid: file.cid,
    })),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
}
