import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  toolbar: {
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  tabContainer: {
    padding: "10px",
  },
  tab: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
  },
  activeTab: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "2px solid #000",
  },
  draggableItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    marginBottom: "10px",
    cursor: "grab",
    position: "relative",
  },
  draggableItemContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    border: "1px solid #ddd",
    marginBottom: "5px",
    cursor: "grab",
    overflow: "hidden",
    height: "100px",
    // transform: `scale(0.7)`,
  },
  draggableItemContainerSelected: {
    border: "2px solid blue",
  },
  grabIcon: {
    marginLeft: "auto",
    cursor: "grab",
    fontSize: "18px",
    color: "#888",
  },
  renderInput: {
    display: "flex",
    flexDirection: "column",
  },
};
