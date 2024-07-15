import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import EditorArea from "./EditorArea";
import { CSS } from "@dnd-kit/utilities";
import { EditorAreaProps } from "../DndXYHtmlEditor.types";

const SortableEditorArea = ({ verticalElementConfiguration, ...props }: EditorAreaProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `editor-${props.verticalElement.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: props.selectedVerticalElement === props.verticalElement.id ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <EditorArea
        verticalElementConfiguration={verticalElementConfiguration}
        verticalElement={props.verticalElement}
        selectedVerticalElement={props.selectedVerticalElement}
        selectedHorizontalElement={props.selectedHorizontalElement}
        onVerticalElementClick={props.onVerticalElementClick}
        onHorizontalElementClick={props.onHorizontalElementClick}
      />
    </div>
  );
};

export default SortableEditorArea;
