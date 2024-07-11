import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { styles } from "./Toolbar.styles";

const draggableItems = [
  <div key="div-element" style={styles.draggableItem}>
    Div Element
  </div>,
  <img
    key="image-element"
    style={styles.draggableItem}
    src="https://via.placeholder.com/50"
    alt="Image Element"
  />,
  <p key="text-element" style={styles.draggableItem}>
    Text Element
  </p>,
];

const Toolbar: React.FC = () => {
  return (
    <div style={styles.toolbar}>
      {draggableItems.map((item, index) => (
        <DraggableItem
          key={item.key}
          id={`draggable-${index}`}
          element={item}
        />
      ))}
    </div>
  );
};

interface DraggableItemProps {
  id: string;
  element: JSX.Element;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, element }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      element,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles.draggableItemContainer}
    >
      {element}
    </div>
  );
};

export default Toolbar;