import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  emailModal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24',
    padding: 4,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  modalContent: {
    overflowY: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
};
