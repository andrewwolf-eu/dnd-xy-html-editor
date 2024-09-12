import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  editorContainer: {
    marginBottom: "10px",
    border: "1px solid #ddd",
    padding: "5px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
    position: "relative",
  },
  editorContainerSelected: {
    border: "2px solid blue",
  },
  editorArea: {
    backgroundColor: "white",
    position: "relative",
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  flexVerticalContainerSelected: {
    borderLeft: "4px solid #0ea6ce",
  },
  flexVertical: {
    // border: "1px solid #ddd",
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
  delete: {
    cursor: "pointer",
    backgroundColor: "#29ce95",
    color: "white",
    borderRadius: "3px",
  },
};
