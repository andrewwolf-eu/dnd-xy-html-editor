import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  iconButtonContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  dragHandle: {
    cursor: "grab",
    backgroundColor: "#29ce95",
    color: "white",
    borderRadius: "3px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    marginRight: "2px",
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
