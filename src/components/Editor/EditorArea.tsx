import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useEditor } from "../../context/EditorContext";
import SortableItem from "./SortableItem";
import DimensionSelector from "./DimensionSelector";
import { EditorAreaProps } from "../../DndXYHtmlEditor.types";
import { styles } from "./EditorArea.styles";

const EditorArea = ({
  verticalElementConfiguration,
  verticalElement,
  onVerticalElementClick,
  onHorizontalElementClick,
}: EditorAreaProps) => {
  const { id: verticalElementId, dimensions } = verticalElement;
  const {
    selectedVerticalElement,
    selectedHorizontalElement,
    removeHorizontalElementFromVerticalElement,
    removeVerticalElement,
  } = useEditor();

  const { setNodeRef } = useDroppable({
    id: `editor-area-${verticalElementId}`,
  });

  const handleRemoveItem = (element: JSX.Element, event: React.MouseEvent) => {
    event.stopPropagation();
    removeHorizontalElementFromVerticalElement(verticalElementId, element);
  };

  const handleItemMouseDown = (itemId: string, event: React.MouseEvent) => {
    let isDragging = false;

    const handleMouseMove = () => {
      isDragging = true;
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      onHorizontalElementClick(itemId);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const isSelectedVerticalElement = selectedVerticalElement === verticalElementId;

  return (
    <div
      style={{
        ...styles.editorContainer,
        ...(isSelectedVerticalElement ? styles.editorContainerSelected : {}),
      }}
      onMouseDown={() => onVerticalElementClick(verticalElementId)}
    >
      {verticalElementConfiguration.enableDimensionSelector && (
        <DimensionSelector verticalElementId={verticalElementId} />
      )}
      {verticalElementConfiguration.enableMultipleContainer && (
        <IconButton
          onMouseDown={() => removeVerticalElement(verticalElementId)}
        >
          <Delete />
        </IconButton>
      )}
      <div ref={setNodeRef} style={{ ...styles.editorArea, ...styles.flexContainer }}>
        <SortableContext
          items={verticalElement.horizontalElements.map(
            (element, index) =>
              element.key || `element-${verticalElement.id}-${index}`
          )}
          strategy={verticalListSortingStrategy}
        >
          {verticalElement.horizontalElements.map((element, index) => {
            const itemId = element.key || `element-${verticalElement.id}-${index}`;
            const isSelectedItem = selectedHorizontalElement === itemId;
            return (
              <SortableItem key={itemId} id={itemId} itemWidth={dimensions[index % dimensions.length]}>
                <div
                  key={itemId}
                  style={{
                    ...styles.flexVertical,
                    ...(isSelectedItem ? styles.flexVerticalContainerSelected : {}),
                  }}
                  onMouseDown={(e) => handleItemMouseDown(itemId.toString(), e)}
                >
                  <div style={styles.editorElement}>
                    {element}
                    <IconButton
                      onMouseDown={(e) => handleRemoveItem(element, e)}
                      style={styles.deleteButton}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </div>
    </div>
  );
};

export default EditorArea;