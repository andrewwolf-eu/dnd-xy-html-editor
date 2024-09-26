import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableEditorArea from "./components/Editor/SortableEditorArea";
import Toolbar from "./components/Toolbar/Toolbar";
import {
  handleDragEnd,
  handleDragStart,
  handleSave,
  handleLoad,
  handleOutput,
} from "./utils/editorHandlers";
import EmailModal from "./components/Email/EmailModal";
import { EditorProvider, useEditor } from "./context/EditorContext";
import { DndXYHtmlEditorProps } from "./DndXYHtmlEditor.types";
import { styles } from "./DndXYHtmlEditor.styles";
import { registerComponent } from "../src/components/componentRegistry";

export const DndXYHtmlEditor = forwardRef((props: DndXYHtmlEditorProps, ref) => {
  return (
    <EditorProvider>
      <AppContent ref={ref} {...props} />
    </EditorProvider>
  );
});

const AppContent = forwardRef(({
  verticalElementConfiguration: {
    enableMultipleContainer = false,
    enableDimensionSelector = false,
    defaultContainerWidthInPercentage = 70,
  } = {},
  actionButtons,
  actionButtons: {
    saveEditorStateAction = false,
    loadEditorStateAction = false,
    htmlOutputAction = false,
    sendEmailAction = false,
  } = {},
  toolbarConfiguration: {
    columnsInElements = 2,
  } = {},
  htmlElements,
  translations,
  localStorageSave = false,
}: DndXYHtmlEditorProps, ref) => {
  useImperativeHandle(ref, () => ({
    loadState, saveState, htmlPreview, htmlOutput,
  }));
  const {
    setHtmlElements,
    verticalElements, setVerticalElements,
    addVerticalElement,
    containerHeight,
    setContainerHeight,
    containerScale,
    setContainerScale
  } = useEditor();
  const loadState = (editorState: string) => {
    handleLoad(setVerticalElements, localStorageSave, editorState)
  };
  const saveState = () => {
    return handleSave(verticalElements, localStorageSave)
  };
  const htmlPreview = () => {
    handleOutput(verticalElements, true)
  };
  const htmlOutput = (attachmentsWithCid?: boolean, plainText?: string) => {
    return handleOutput(verticalElements, false, attachmentsWithCid, plainText)
  };

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);
  const [editorWidthPercent, setEditorWidthPercent] = useState(defaultContainerWidthInPercentage);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    htmlElements.forEach((htmlElement) => {
      registerComponent(htmlElement.configuration.elementIdentifier, htmlElement.element)
      if (htmlElement.configuration.hasOwnProperty('customAction')) {
        registerComponent(`${htmlElement.configuration.elementIdentifier}_customAction`, htmlElement.configuration.customAction)
      }
    })
    setHtmlElements(htmlElements)

    const updateHeight = () => setContainerHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleMouseMove = (e) => {
    const containerWidth = document.body.clientWidth;
    const newWidth = (e.clientX / containerWidth) * 100;
    if (newWidth > 50) {
      setEditorWidthPercent(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) =>
        handleDragStart(event, setActiveId, setActiveElement)
      }
      onDragEnd={(event) =>
        handleDragEnd(event, verticalElements, setVerticalElements, setActiveId, setActiveElement, containerScale, setContainerScale)
      }
    >
      <div style={styles.app}>
        <div style={{ ...styles.editorAreaContainer, height: containerHeight, width: `${editorWidthPercent}%`, }}>
          <SortableContext
            items={verticalElements.map((verticalElement) => `editor-${verticalElement.id}`)}
          >
            {verticalElements.map((verticalElement) => (
              <SortableEditorArea
                verticalElementConfiguration={{ enableDimensionSelector, enableMultipleContainer }}
                key={verticalElement.id}
                verticalElement={verticalElement}
                editorWidthPercent={editorWidthPercent}
              />
            ))}
          </SortableContext>
        </div>
        <div
          style={styles.resizer}
          onMouseDown={handleMouseDown}
        />
        <div style={{ ...styles.toolbarContainer, flexBasis: `${100 - editorWidthPercent}%`, }}>
          {actionButtons && <div style={styles.controls}>
            {enableMultipleContainer && <button type='button' onClick={addVerticalElement}>{translations?.actionButtons?.addVerticalElement ?? 'Add Vertical Element'}</button>}
            {saveEditorStateAction && <button type='button' onClick={() => handleSave(verticalElements, localStorageSave)}>{translations?.actionButtons?.save ?? 'Save'}</button>}
            {loadEditorStateAction && <button type='button' onClick={() => handleLoad(setVerticalElements, localStorageSave)}>{translations?.actionButtons?.load ?? 'Load'}</button>}
            {htmlOutputAction && <button type='button' onClick={() => handleOutput(verticalElements, true)}>{translations?.actionButtons?.htmlOutput ?? 'HTML Output'}</button>}
            {sendEmailAction && <EmailModal translations={translations} />}
          </div>}
          <Toolbar toolbarConfiguration={{ columnsInElements }} translations={translations} />
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
});