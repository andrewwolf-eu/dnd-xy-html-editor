import React, { useState } from 'react';
import EmailForm from './EmailForm';
import { Translations } from 'DndXYHtmlEditor.types';

const EmailModal: React.FC<{ translations: Translations }> = ({ translations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setIsModalOpen(true)}>
        {translations?.actionButtons?.sendEmail ?? 'Send e-mail'}
      </button>
      <EmailForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default EmailModal;