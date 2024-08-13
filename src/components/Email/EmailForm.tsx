import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { styles } from "./EmailForm.styles";
import emailjs from 'emailjs-com';
import { useEditor } from '../../context/EditorContext';
import { handleOutput } from '../../utils/editorHandlers';

interface EmailJSConfig {
    service_id: string;
    template_id: string;
    public_key: string;
}

interface ToSend {
    from_name: string;
    to_name: string;
    reply_to: string;
    myHTML: string;
}

interface EmailFormProps {
    open: boolean;
    onClose: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ open, onClose }) => {
    const {
        verticalElements
    } = useEditor();

    const [emailJSConfig, setEmailJSConfig] = useState<EmailJSConfig>({
        service_id: '',
        template_id: '',
        public_key: '',
    });

    const [toSend, setToSend] = useState<ToSend>({
        from_name: 'farkas.andras.jp@gmail.com',
        to_name: 'farkas.andras.uk@gmail.com',
        reply_to: 'farkas.andras.uk@gmail.com, farkas.andras.usa@gmail.com',
        myHTML: ''
    });

    const handleConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailJSConfig({ ...emailJSConfig, [name]: value });
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: FormEvent) => {
        const htmlOutput = toSend.myHTML ? toSend.myHTML : handleOutput(verticalElements, (htmlOutput: string) => htmlOutput)
        e.preventDefault();

        emailjs.send(
            emailJSConfig.service_id,
            emailJSConfig.template_id,
            {
                from_name: toSend.from_name,
                to_name: toSend.to_name,
                reply_to: toSend.reply_to,
                myHTML: htmlOutput,
            },
            emailJSConfig.public_key
        ).then(
            (response) => {
                alert('Email sent successfully!');
            },
            (error) => {
                console.error('Failed to send email:', error);
                alert(`Failed to send email: ${error.text}`);
            }
        );

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles.emailModal}>
                <Box sx={styles.modalContent}>
                    <h2>EmailJS Configuration</h2>
                    <TextField
                        label="Service ID"
                        name="service_id"
                        value={emailJSConfig.service_id}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="Template ID"
                        name="template_id"
                        value={emailJSConfig.template_id}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <TextField
                        label="Public Key"
                        name="public_key"
                        value={emailJSConfig.public_key}
                        onChange={handleConfigChange}
                        fullWidth
                    />
                    <h2>Email Form</h2>
                    <TextField
                        label="From name"
                        type="text"
                        name="from_name"
                        value={toSend.from_name}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    <TextField
                        label="To name"
                        type="text"
                        name="to_name"
                        value={toSend.to_name}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    <TextField
                        label="Reply-to email"
                        type="email"
                        name="reply_to"
                        value={toSend.reply_to}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    <TextField
                        label="Your message (HTML)"
                        name="myHTML"
                        value={toSend.myHTML}
                        onChange={handleEmailChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Send
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EmailForm;