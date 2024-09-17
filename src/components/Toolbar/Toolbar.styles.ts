import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  toolbar: {
    backgroundColor: "white",
    width: "100%",
  },
  tabButtonContainer: {
    borderBottom: "2px solid #eeeeee",
  },
  tabContainer: {
    padding: "10px",
  },
  tab: {
    border: "none",
    width: "50%",
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "white",
    borderBottom: "3px solid transparent",
  },
  activeTab: {
    border: "none",
    width: "50%",
    padding: "10px",
    backgroundColor: "white",
    borderBottom: "3px solid #0EA6CE",
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
  renderInputLabel: {
    fontWeight: 600,
    paddingTop: "10px",
    paddingBottom: "10px",
    color: "#12326E",
  },
  divider: {
    marginTop: "20px",
    height: "1px",
    width: "100%",
    backgroundColor: "#EEEEEE",
  },
};
