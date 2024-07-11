import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  toolbar: {
    // padding: '10px',
    // borderRight: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  draggableItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    cursor: 'grab',
    position: 'relative',
  },
  draggableItemContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    cursor: 'grab',
    position: 'relative',
  },
  grabIcon: {
    marginLeft: 'auto',
    cursor: 'grab',
    fontSize: '18px',
    color: '#888',
  },
};