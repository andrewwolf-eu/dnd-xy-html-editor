import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: any;
  itemWidth: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, itemWidth, children, }) => {
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
    zIndex: isDragging ? 1000 : "auto", // Ensure dragging item is on top
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default SortableItem;
