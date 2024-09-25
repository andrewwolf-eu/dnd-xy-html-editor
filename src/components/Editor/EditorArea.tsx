import React, { useEffect, useRef, useState } from "react";
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
  editorWidthPercent,
}: EditorAreaProps) => {
  const paddingHorizontal = 10
  const editorAreaRef = useRef<HTMLDivElement>(null);
  const [editorAreaWidth, setEditorAreaWidth] = useState(0);
  const elementRefs = useRef([]);

  const { id: verticalElementId, dimensions } = verticalElement;
  const {
    selectedVerticalElement,
    selectedHorizontalElement,
    removeVerticalElement,
    containerHeight,
    containerScale,
    setContainerScale
  } = useEditor();

  const { setNodeRef } = useDroppable({
    id: `editor-area-${verticalElementId}`,
  });

  const handleItemMouseDown = (itemId: string, event: React.MouseEvent) => {
    const handleMouseMove = () => {
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

  const updateContainerWidth = () => {
    if (editorAreaRef.current) {
      const width = editorAreaRef.current.getBoundingClientRect().width - (2 * paddingHorizontal);
      setEditorAreaWidth(width);
    }
  };

  useEffect(() => {
    updateContainerWidth();
  }, [editorWidthPercent]);

  // useEffect to update the container width on mount and on browser resize
  useEffect(() => {
    // Set the initial width
    updateContainerWidth();

    // Add an event listener to update the width on window resize
    window.addEventListener('resize', updateContainerWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  useEffect(() => {
    elementRefs.current.forEach((ref, index) => {
      if (ref) {
        const containerWidth = ref.getBoundingClientRect().width
        const newContainerScale = containerScale
        const scale = editorAreaWidth ? editorAreaWidth / ref.getBoundingClientRect().width : 1;
        if (editorAreaWidth !== containerWidth) {
          newContainerScale[index] = scale
        }
        setContainerScale(newContainerScale)
      }
    });
  }, [verticalElement.horizontalElements]);

  return (
    <div
      ref={editorAreaRef}
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
          style={styles.delete}
          size='small'
          onMouseDown={() => removeVerticalElement(verticalElementId)}
        >
          <Delete />
        </IconButton>
      )}
      <div ref={setNodeRef} style={{ ...styles.editorArea, ...styles.flexContainer, padding: `${paddingHorizontal}px ${paddingHorizontal}px ${containerHeight - 60}px 10px` }}>
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
              <SortableItem
                key={itemId}
                id={itemId}
                itemIndex={index}
                itemWidth={dimensions[index % dimensions.length]}
                verticalElement={verticalElement}
                element={element}
                scale={containerScale[index]}
              >
                <div
                  ref={el => (elementRefs.current[index] = el)}
                  key={itemId}
                  style={{
                    ...styles.flexVertical,
                    ...(isSelectedItem ? styles.flexVerticalContainerSelected : {}),
                  }}
                  onMouseDown={(e) => handleItemMouseDown(itemId.toString(), e)}
                >
                  <div style={styles.editorElement}>
                    {element}
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