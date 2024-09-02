import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendEmail } from './mailer';
import { EmailOptions } from './types';

const app = express();

app.use(cors());

app.use(express.json());

app.post('/send-email', async (req: Request, res: Response) => {
  const { sender, recipient, title, body, attachments }: EmailOptions = req.body;

  try {
    await sendEmail({ sender, recipient, title, body, attachments });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});