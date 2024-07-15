import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { DraggableItemProps, DynamicHTMLContentProps, htmlElement } from "DndXYHtmlEditor.types";
import { styles } from "./Toolbar.styles";
import { demoHtmlElements } from "./DemoHtmlElements";
import { useEditor } from "../context/EditorContext";

// Define the DynamicHTMLContent component
const DynamicHTMLContent: React.FC<DynamicHTMLContentProps> = ({ htmlElement }) => {
  const Element = htmlElement.element;
  return (<Element {...htmlElement.configuration} />);
};

const ConfigurationComponent: React.FC<ConfigurationComponentProps> = ({ element }) => {
  return (
    <div>
      {/* Render configuration options based on the selected element */}
      <p>Configuration for: {element.name}</p>
    </div>
  );
};

const Toolbar = () => {
  const { htmlElements } = useEditor();
  const toolbarhtmlElements = htmlElements ? htmlElements : demoHtmlElements
  // State to manage active tab and selected element
  const [activeTab, setActiveTab] = useState<string>('elements');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  // Function to handle tab switch
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleElementSelect = (element: HTMLElement) => {
    setSelectedElement(element);
  };

  return (
    <div style={styles.toolbar}>
      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button onClick={() => handleTabChange('elements')} style={activeTab === 'elements' ? styles.activeTab : styles.tab}>
          Elements
        </button>
        <button onClick={() => handleTabChange('configuration')} style={activeTab === 'configuration' ? styles.activeTab : styles.tab}>
          Configuration
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'elements' && (
        <div style={styles.tabContent}>
          {toolbarhtmlElements.map((item: htmlElement, index) => {
            return (
              <DraggableItem
                key={index}
                id={`draggable-${index}`}
                element={<DynamicHTMLContent htmlElement={item} />}
                onClick={() => handleElementSelect(item)}
              />
            );
          })}
        </div>
      )}
      {activeTab === 'configuration' && (
        <div style={styles.tabContent}>
          {selectedElement ? (
            <ConfigurationComponent element={selectedElement} />
          ) : (
            <div>Please select an element to configure</div>
          )}
        </div>
      )}
    </div>
  );
};

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