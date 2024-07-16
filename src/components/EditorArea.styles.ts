import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  editorContainer: {
    marginBottom: "10px",
    border: "1px solid #ddd",
    padding: '5px',
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    position: "relative",
  },
  editorContainerSelected: {
    border: "2px solid blue",
  },
  dimensionConfig: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editorArea: {
    border: "2px dashed #ccc",
    minHeight: '500px',
    padding: "10px 10px 500px 10px",
    backgroundColor: "#fff",
    position: "relative",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  flexRow: {
    display: "flex",
    width: "100%",
    gap: "10px",
  },
  flexVerticalContainer: {
    position: "relative",
    flexGrow: 1,
  },
  flexVerticalContainerSelected: {
    border: "2px solid blue",
  },
  flexVertical: {
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  editorElement: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: "-15px",
    right: "-15px",
    cursor: "pointer",
    zIndex: 10,
  },
  draggableItem: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    marginBottom: "10px",
    cursor: "grab",
  },
  sortableItem: {
    position: "relative",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
};
