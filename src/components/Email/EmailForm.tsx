import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { styles } from "./EmailForm.styles";
import { useEditor } from '../../context/EditorContext';
import { handleOutput } from '../../utils/editorHandlers';
import axios from 'axios';
import { EmailFormProps, SMTPConfig, ToSend } from './types';

const EmailForm: React.FC<EmailFormProps> = ({ open, onClose }) => {
    const { verticalElements } = useEditor();

    const [smtpConfig, setSmtpConfig] = useState<SMTPConfig>({
        host: process.env.REACT_APP_SMTP_HOST || '',
        username: process.env.REACT_APP_SMTP_USER || '',
        password: process.env.REACT_APP_SMTP_PASSWORD || '',
        port: process.env.REACT_APP_SMTP_PORT || '',
        secure: process.env.REACT_APP_SMTP_SECURE === 'true',
        from: process.env.REACT_APP_SMTP_FROM || ''
    });

    const [toSend, setToSend] = useState<ToSend>({
        recipient: '',
        title: '',
        htmlBody: '',
        plainTextBody: `
        Hi John,
        
        Thank you for signing up for our newsletter at XYZ Corp! We're excited to share the latest updates, news, and exclusive content with you.
        
        Here's what you can look forward to:
        - Weekly updates on the latest trends
        - Exclusive offers and discounts just for subscribers
        - Expert insights and tips directly from our team
        
        If you ever have any questions, feel free to reply to this email or visit our website at https://xyzcorp.com.
        
        Thanks again for joining us!
        
        Best regards,
        The XYZ Corp Team
        https://xyzcorp.com
        1234 Street Name, City, Country
        Phone: (123) 456-7890
        `,
        cidBasedImageEmbedding: true,
    });

    const handleConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSmtpConfig({
            ...smtpConfig,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleToSendChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setToSend({ ...toSend, [name]: type === 'checkbox' ? checked : value, });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { htmlOutput, plainTextOutput, attachments } = handleOutput(
            verticalElements,
            false,
            toSend.cidBasedImageEmbedding,
            toSend.plainTextBody,
        );

        try {
            const response = await axios.post(`${process.env.REACT_APP_SMTP_SERVICE_URL}/send-email`, {
                sender: smtpConfig.from,
                ...toSend,
                plainTextBody: toSend.plainTextBody ? toSend.plainTextBody : plainTextOutput,
                htmlBody: htmlOutput,
                attachments
            });

            if (response.status === 200) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            alert(`Failed to send email: ${error.message}`);
        }

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles.emailModal}>
                <Box sx={styles.modalContent}>
                    <h2>SMTP Configuration</h2>
                    <TextField
                        label="SMTP Host"
                        name="host"
                        value={smtpConfig.host}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="SMTP Port"
                        name="port"
                        value={smtpConfig.port}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="SMTP Username"
                        name="username"
                        value={smtpConfig.username}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="SMTP Password"
                        name="password"
                        type="password"
                        value={smtpConfig.password}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="From Email"
                        name="from"
                        value={smtpConfig.from}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={smtpConfig.secure}
                                onChange={handleConfigChange}
                                name="secure"
                            />
                        }
                        label="Use SSL/TLS (Secure Connection)"
                    />
                    <h2>Email Details</h2>
                    <TextField
                        label="To Email"
                        type="email"
                        name="recipient"
                        value={toSend.recipient}
                        onChange={handleToSendChange}
                        fullWidth
                    />
                    <TextField
                        label="Title"
                        type="text"
                        name="title"
                        value={toSend.title}
                        onChange={handleToSendChange}
                        fullWidth
                    />
                    <TextField
                        label="Message (HTML)"
                        name="plainTextBody"
                        value={toSend.plainTextBody}
                        onChange={handleToSendChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={toSend.cidBasedImageEmbedding}
                                onChange={handleToSendChange}
                                name="cidBasedImageEmbedding"
                            />
                        }
                        label="Use CID-based Image Embedding (Inline Images)"
                    />
                    <Button type='button' variant="contained" color="primary" onClick={onSubmit}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EmailForm;