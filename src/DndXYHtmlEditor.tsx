import React, { useEffect, useState } from "react";
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
import EmailModal from "./components/EmailModal";
import { EditorProvider, useEditor } from "./context/EditorContext";
import { DndXYHtmlEditorProps } from "DndXYHtmlEditor.types";
import { styles } from "./DndXYHtmlEditor.styles";
import { registerComponent } from "../src/components/componentRegistry";

const AppContent = ({ verticalElementConfiguration = { enableDelete: true, enableDimensionSelector: true }, htmlElements, formattedHtmlOutput }: DndXYHtmlEditorProps) => {
  const {
    setHtmlElements,
    verticalElements, setVerticalElements,
    setSelectedVerticalElement,
    setSelectedHorizontalElement,
    addVerticalElement
  } = useEditor();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(window.innerHeight);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    htmlElements.forEach((htmlElement) => {
      registerComponent(htmlElement.configuration.elementIdentifier, htmlElement.element)
    })
    setHtmlElements(htmlElements)

    const updateHeight = () => setContainerHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const onVerticalElementClick = (verticalElementId: string) => {
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
        <div style={{ ...styles.editorAreaContainer, height: containerHeight }}>
          <SortableContext
            items={verticalElements.map((verticalElement) => `editor-${verticalElement.id}`)}
          >
            {verticalElements.map((verticalElement) => (
              <SortableEditorArea
                verticalElementConfiguration={verticalElementConfiguration}
                key={verticalElement.id}
                verticalElement={verticalElement}
                onVerticalElementClick={onVerticalElementClick}
                onHorizontalElementClick={onHorizontalElementClick}
              />
            ))}
          </SortableContext>
        </div>
        <div style={styles.toolbarContainer}>
          <div style={styles.controls}>
            {verticalElementConfiguration.enableDelete && <button onClick={addVerticalElement}>Add Vertical Element</button>}
            <button onClick={() => handleSave(verticalElements)}>Save</button>
            <button onClick={() => handleLoad(setVerticalElements)}>Load</button>
            <button onClick={() => handleOutput(verticalElements, formattedHtmlOutput)}>HTML Output</button>
          </div>
          <EmailModal />
          <Toolbar />
        </div>
        <DragOverlay>
          {activeId && activeElement ? (
            <div style={styles.dragOverlay}>
              {activeElement.props.htmlElement.toolbarPreview ? activeElement.props.htmlElement.toolbarPreview : React.cloneElement(activeElement)}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export const DndXYHtmlEditor = (props: DndXYHtmlEditorProps) => {
  return (
    <EditorProvider>
      <AppContent {...props} />
    </EditorProvider>
  );
};