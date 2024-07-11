import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableEditorArea from "./components/SortableEditorArea";
import Toolbar from "./components/Toolbar";
import {
  handleDragEnd,
  handleDragStart,
  handleSave,
  handleLoad,
  handleOutput,
} from "./utils/editorHandlers";
import { EditorProvider, useEditor } from "./context/EditorContext";
import { styles } from "./DndXYHtmlEditor.styles";

const AppContent: React.FC = () => {
  const { verticalElements, addVerticalElement, setVerticalElements } = useEditor();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);
  const [selectedVerticalElement, setSelectedVerticalElement] = useState<number | null>(null);
  const [selectedHorizontalElement, setSelectedHorizontalElement] = useState<string | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onVerticalElementClick = (verticalElementId: number) => {
    setSelectedVerticalElement(verticalElementId);
    setSelectedHorizontalElement(null);
  };

  const onHorizontalElementClick = (horizontalElementId: string) => {
    setSelectedHorizontalElement(horizontalElementId);
    setSelectedVerticalElement(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={(event) =>
        handleDragStart(event, setActiveId, setActiveElement)
      }
      onDragEnd={(event) =>
        handleDragEnd(event, verticalElements, setVerticalElements, setActiveId, setActiveElement)
      }
    >
      <div style={styles.app}>
        <div style={styles.editorAreaContainer}>
          <SortableContext
            items={verticalElements.map((verticalElement) => `editor-${verticalElement.id}`)}
          >
            {verticalElements.map((verticalElement) => (
              <SortableEditorArea
                key={verticalElement.id}
                verticalElement={verticalElement}
                selectedVerticalElement={selectedVerticalElement}
                selectedHorizontalElement={selectedHorizontalElement}
                onVerticalElementClick={onVerticalElementClick}
                onHorizontalElementClick={onHorizontalElementClick}
              />
            ))}
          </SortableContext>
        </div>
        <div style={styles.toolbarContainer}>
          <Toolbar />
          <div style={styles.controls}>
            <button onClick={addVerticalElement}>Add Vertical Element</button>
            <button onClick={() => handleSave(verticalElements)}>Save</button>
            <button onClick={() => handleLoad(setVerticalElements)}>Load</button>
            <button onClick={() => handleOutput(verticalElements)}>HTML Output</button>
          </div>
        </div>
        <DragOverlay>
          {activeId && activeElement ? (
            <div style={styles.dragOverlay}>
              {React.cloneElement(activeElement)}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export const DndXYHtmlEditor = () => {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
};