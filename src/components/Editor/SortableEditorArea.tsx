import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import EditorArea from "./EditorArea";
import { CSS } from "@dnd-kit/utilities";
import { EditorAreaProps } from "../../DndXYHtmlEditor.types";
import { useEditor } from "../../context/EditorContext";

const SortableEditorArea = ({ verticalElementConfiguration, editorWidthPercent, ...props }: EditorAreaProps) => {
  const { selectedVerticalElement } = useEditor();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `editor-${props.verticalElement.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: selectedVerticalElement === props.verticalElement.id ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <EditorArea
        verticalElementConfiguration={verticalElementConfiguration}
        verticalElement={props.verticalElement}
        onVerticalElementClick={props.onVerticalElementClick}
        onHorizontalElementClick={props.onHorizontalElementClick}
        editorWidthPercent={editorWidthPercent}
      />
    </div>
  );
};

export default SortableEditorArea;
