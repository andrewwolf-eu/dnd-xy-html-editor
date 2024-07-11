import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import SortableItem from "./SortableItem";
import DimensionSelector from "./DimensionSelector";
import { useEditor } from "../context/EditorContext";
import { styles } from "./EditorArea.styles";

interface EditorAreaProps {
  verticalElementId: number;
  horizontalElements: JSX.Element[];
  dimensions: string[];
  updateVerticalElementHorizontalElements: (horizontalElements: JSX.Element[]) => void;
  selectedVerticalElement: number | null;
  selectedHorizontalElement: string | null;
  onVerticalElementClick: (verticalElementId: number) => void;
  onHorizontalElementClick: (horizontalElementId: string) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({
  verticalElementId,
  horizontalElements,
  dimensions,
  updateVerticalElementHorizontalElements,
  selectedVerticalElement,
  selectedHorizontalElement,
  onVerticalElementClick,
  onHorizontalElementClick,
}) => {
  const { setNodeRef } = useDroppable({
    id: `editor-area-${verticalElementId}`,
  });

  const handleRemoveItem = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    updateVerticalElementHorizontalElements(horizontalElements.filter((_, i) => i !== index));
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
      <DimensionSelector
        verticalElementId={verticalElementId}
      />
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
                      ...styles.flexColumnContainer,
                      ...(isSelectedItem ? styles.flexColumnContainerSelected : {}),
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      onHorizontalElementClick(itemId.toString());
                    }}
                  >
                    <SortableItem id={itemId}>
                      <div
                        style={{
                          ...styles.flexColumn,
                          flexBasis: dimensions[index % dimensions.length],
                        }}
                      >
                        <div style={styles.editorElement}>
                          {element}
                          <IconButton
                            onMouseDown={(e) => handleRemoveItem(index, e)}
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