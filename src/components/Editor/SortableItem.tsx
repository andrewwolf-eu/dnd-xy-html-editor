import React, { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton } from '@mui/material';
import { Delete, DragIndicator } from '@mui/icons-material';
import { useEditor } from "../../context/EditorContext";
import { VerticalElement } from "DndXYHtmlEditor.types";
import { styles } from "./SortableItem.styles";

interface SortableItemProps {
  id: any;
  itemIndex: number;
  itemWidth: string;
  children: React.ReactNode;
  verticalElement: VerticalElement,
  element: JSX.Element,
  scale: number
}

const SortableItem: React.FC<SortableItemProps> = ({ id, itemIndex, itemWidth, children, verticalElement, element, scale }) => {
  const hoverButtonsRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const {
    removeHorizontalElementFromVerticalElement,
    containerScale,
    setContainerScale,
    selectedHorizontalElement,
  } = useEditor();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    flexBasis: `calc(${itemWidth} - 8px)`,
    opacity: isDragging ? 0.5 : 1,
    overflow: 'hidden',
    zIndex: isDragging ? 1000 : "auto", // Ensure dragging item is on top
  };

  const handleRemoveItem = (element: JSX.Element, event: React.MouseEvent) => {
    event.stopPropagation();
    removeHorizontalElementFromVerticalElement(verticalElement.id, element);
    const newContainerScale = containerScale.filter((_, index) => index !== itemIndex);
    setContainerScale(newContainerScale)
  };

  useEffect(() => {
    const hoverButtonMove = hoverButtonsRef.current?.querySelectorAll('.hover-button-move');
    const hoverButtonDelete = hoverButtonsRef.current?.querySelectorAll('.hover-button-delete');

    if (hoverButtonMove) {
      hoverButtonMove.forEach((btn) => {
        if (btn instanceof HTMLElement) {
          btn.style.opacity = isHovered && selectedHorizontalElement && !selectedHorizontalElement.includes('immovable') ? '1' : '0';
        }
      });
    }
    if (hoverButtonDelete) {
      hoverButtonDelete.forEach((btn) => {
        if (btn instanceof HTMLElement) {
          btn.style.opacity = isHovered && selectedHorizontalElement && !selectedHorizontalElement.includes('protected') ? '1' : '0';
        }
      });
    }
  }, [selectedHorizontalElement]);

  return (
    <div ref={setNodeRef} style={style} {...attributes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        <div style={{ flexGrow: 1 }}>
          {children}
          <div style={styles.iconButtonContainer} ref={hoverButtonsRef}>
            {selectedHorizontalElement && !selectedHorizontalElement.includes('immovable') &&
              <IconButton className="hover-button-move" {...listeners} style={styles.dragHandle}>
                <DragIndicator />
              </IconButton>}
            {selectedHorizontalElement && !selectedHorizontalElement.includes('protected') &&
              <IconButton
                className="hover-button-delete"
                onMouseDown={(e) => handleRemoveItem(element, e)}
                style={styles.delete}
              >
                <Delete />
              </IconButton>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortableItem;
