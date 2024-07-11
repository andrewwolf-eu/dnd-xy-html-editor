import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import EditorArea from "./EditorArea";
import { CSS } from "@dnd-kit/utilities";
import { useEditor } from "../context/EditorContext";
import { VerticalElement } from "../DndXYHtmlEditor.types";

interface SortableEditorAreaProps {
  verticalElement: VerticalElement;
  selectedVerticalElement: number | null;
  selectedHorizontalElement: string | null;
  onVerticalElementClick: (verticalElementId: number) => void;
  onHorizontalElementClick: (horizontalElementId: string) => void;
}

const SortableEditorArea: React.FC<SortableEditorAreaProps> = (props) => {
  const { updateVerticalElementHorizontalElements, updateVerticalElementDimension } = useEditor();
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
        verticalElementId={props.verticalElement.id}
        horizontalElements={props.verticalElement.horizontalElements}
        dimensions={props.verticalElement.dimensions}
        updateVerticalElementHorizontalElements={(horizontalElements) =>
          updateVerticalElementHorizontalElements(props.verticalElement.id, horizontalElements)
        }
        selectedVerticalElement={props.selectedVerticalElement}
        selectedHorizontalElement={props.selectedHorizontalElement}
        onVerticalElementClick={props.onVerticalElementClick}
        onHorizontalElementClick={props.onHorizontalElementClick}
      />
    </div>
  );
};

export default SortableEditorArea;
