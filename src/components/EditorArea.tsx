import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useEditor } from "../context/EditorContext";
import SortableItem from "./SortableItem";
import DimensionSelector from "./DimensionSelector";
import { EditorAreaProps } from "../DndXYHtmlEditor.types";
import { styles } from "./EditorArea.styles";

const EditorArea = ({
  verticalElementConfiguration,
  verticalElement,
  onVerticalElementClick,
  onHorizontalElementClick,
}: EditorAreaProps) => {
  const { id: verticalElementId, horizontalElements, dimensions } = verticalElement
  const {
    selectedVerticalElement,
    selectedHorizontalElement,
    removeHorizontalElementFromVerticalElement,
    removeVerticalElement
  } = useEditor();
  const { setNodeRef } = useDroppable({
    id: `editor-area-${verticalElementId}`,
  });

  const handleRemoveItem = (element: JSX.Element, event: React.MouseEvent) => {
    event.stopPropagation();
    removeHorizontalElementFromVerticalElement(verticalElementId, element);
  };

  const rows: JSX.Element[][] = [];
  for (let i = 0; i < horizontalElements.length; i += dimensions.length) {
    rows.push(horizontalElements.slice(i, i + dimensions.length));
  }

  const isSelectedVerticalElement = selectedVerticalElement === verticalElementId;

  return (
    <div
      style={{
        ...styles.editorContainer,
        ...(isSelectedVerticalElement ? styles.editorContainerSelected : {}),
      }}
      onMouseDown={() => onVerticalElementClick(verticalElementId)}
    >
      {verticalElementConfiguration.enableDimensionSelector && <DimensionSelector
        verticalElementId={verticalElementId}
      />}
      {verticalElementConfiguration.enableMultipleContainer && <IconButton
        onMouseDown={() => removeVerticalElement(verticalElementId)}
      >
        <Delete />
      </IconButton>}
      <div ref={setNodeRef} style={{ ...styles.editorArea, ...styles.flexContainer }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.flexRow}>
            <SortableContext
              items={row.map(
                (element, index) =>
                  element.key || `element-${rowIndex}-${index}`
              )}
            >
              {row.map((element, index) => {
                const itemId = element.key || `element-${rowIndex}-${index}`;
                const isSelectedItem = selectedHorizontalElement === itemId;
                return (
                  <div
                    key={itemId}
                    style={{
                      ...styles.flexVerticalContainer,
                      ...(isSelectedItem ? styles.flexVerticalContainerSelected : {}),
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      onHorizontalElementClick(itemId.toString());
                    }}
                  >
                    <SortableItem id={itemId}>
                      <div
                        style={{
                          ...styles.flexVertical,
                          flexBasis: dimensions[index % dimensions.length],
                        }}
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
                  </div>
                );
              })}
            </SortableContext>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorArea;