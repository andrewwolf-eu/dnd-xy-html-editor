import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  iconButtonContainer: { display: 'flex', flexDirection: 'column' },
  dragHandle: {
    cursor: "grab",
    backgroundColor: "#29ce95",
    color: "white",
    borderRadius: "3px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    marginBottom: '2px'
  },
  delete: {
    cursor: "pointer",
    backgroundColor: "#29ce95",
    color: "white",
    borderRadius: "3px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
};
