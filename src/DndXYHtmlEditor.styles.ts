import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  editorAreaContainer: {
  },
  resizer: {
    width: '5px',
    backgroundColor: 'gray',
    cursor: 'col-resize',
    position: 'relative',
    zIndex: 1,
  },
  toolbarContainer: {
    backgroundColor: '#e0e0e0',
  },
  controls: {
    // marginTop: '20px',
  },
  dragOverlay: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: 0.7,
  },
};