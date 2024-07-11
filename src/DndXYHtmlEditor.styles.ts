import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  editorAreaContainer: {
    flexGrow: 1,
    // padding: '20px',
    overflowY: 'auto',
  },
  toolbarContainer: {
    width: '300px',
    // padding: '20px',
    borderLeft: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
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