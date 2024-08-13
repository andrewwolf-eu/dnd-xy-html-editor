import React from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  DraggableItemProps,
} from "DndXYHtmlEditor.types";
import { styles } from "./Toolbar.styles";

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, element, toolbarPreview, onMouseDown, selectedElementId }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      element,
    },
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseDown) {
      onMouseDown(event);
    }
    listeners.onMouseDown(event);
  };

  const isSelectedItem = selectedElementId === id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      style={{
        ...styles.draggableItemContainer,
        ...(isSelectedItem ? styles.draggableItemContainerSelected : {}),
      }}
    >
      {toolbarPreview}
    </div>
  );
};