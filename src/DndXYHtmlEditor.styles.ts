import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  app: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: '#fafafa'
  },
  editorAreaContainer: {
    paddingTop: '30px',
    paddingLeft: '80px',
    paddingRight: '80px',
    overflow: "auto",
  },
  resizer: {
    width: "5px",
    backgroundColor: "white",
    cursor: "col-resize",
    position: "relative",
    zIndex: 1,
    boxShadow: "-3px 0px 5px rgba(0, 0, 0, 0.1)",
  },
  toolbarContainer: {
    backgroundColor: "white",
  },
  controls: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '10px',
    margin: "10px",
  },
  dragOverlay: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1000,
    opacity: 0.7,
  },
};
