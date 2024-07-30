import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import EmailForm from './EmailForm';

const EmailModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <button onClick={() => setIsModalOpen(true)}>
        Send e-mail
      </button>
      <EmailForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default EmailModal;