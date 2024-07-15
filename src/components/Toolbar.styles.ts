import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  toolbar: {
    // padding: '10px',
    // borderRight: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  tabContainer: {
    display: 'flex',
  },
  tab: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid #000',
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
    justifyContent: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    cursor: 'grab',
    overflow: 'hidden',
    // transform: `scale(0.7)`,
    height: '100px'
  },
  draggableItemContainerSelected: {
    border: "2px solid blue",
  },
  grabIcon: {
    marginLeft: 'auto',
    cursor: 'grab',
    fontSize: '18px',
    color: '#888',
  },
};