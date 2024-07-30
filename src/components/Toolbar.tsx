import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ConfigurationComponentProps, DraggableItemProps, DynamicHTMLContentProps, htmlElement } from "DndXYHtmlEditor.types";
import { styles } from "./Toolbar.styles";
import { demoHtmlElements } from "./DemoHtmlElements";
import { useEditor } from "../context/EditorContext";
import { parseIfJsonObject } from "../utils/dimensionUtils";

// Define the DynamicHTMLContent component
export const DynamicHTMLContent: React.FC<DynamicHTMLContentProps> = ({ htmlElement }) => {
  const Element = htmlElement.element;
  return (<Element {...htmlElement.configuration} />);
};

const ConfigurationComponent: React.FC<ConfigurationComponentProps> = ({ configuration }) => {
  const { setHtmlElements } = useEditor();
  const [formState, setFormState] = useState(() => {
    // Initialize the form state based on the configuration object
    const initialState: { [key: string]: any } = {};
    for (const key in configuration) {
      initialState[key] = configuration[key];
    }
    return initialState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    const result = parseIfJsonObject(value);
    if (result) {
      value = result;
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setHtmlElements((prevElements: htmlElement[]) => {
      return [
        ...prevElements.map(((prevElement: htmlElement) => {
          if (prevElement.configuration.key !== configuration.key) {
            return prevElement
          } else {
            const updatedElement = {
              ...prevElement,
              configuration: {
                ...prevElement.configuration,
                [name]: value
              }
            }
            return updatedElement
          }
        }))
      ]
    });
  };

  const handleSaveChanges = () => {
  };

  const renderInput = (key: string, value: any) => {
    if (typeof value === 'string') {
      return (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="text"
            name={key}
            value={formState[key]}
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeof value === 'number') {
      return (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="number"
            name={key}
            value={formState[key]}
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeof value === 'boolean') {
      return (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="checkbox"
            name={key}
            checked={formState[key]}
            onChange={(e) => setFormState((prevState) => ({
              ...prevState,
              [key]: e.target.checked
            }))}
          />
        </div>
      );
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const stringValue = JSON.stringify(formState[key])
      return (
        <div key={key} style={value}>
          <label style={value}>{key}:</label>
          <input
            type="text"
            name={key}
            value={stringValue}
            onChange={handleChange}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <p>Configuration for: {configuration.key || 'unknown'}</p>
      {Object.entries(configuration).map(([key, value]) =>
        renderInput(key, value)
      )}
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

const Toolbar = () => {
  const { selectedHorizontalElement, htmlElements } = useEditor();
  const toolbarhtmlElements = htmlElements ? htmlElements : demoHtmlElements
  // State to manage active tab and selected element
  const [activeTab, setActiveTab] = useState<string>('elements');
  const [selectedElement, setSelectedElement] = useState<{ id: string, HtmlElement: htmlElement }>({ id: '', HtmlElement: null });

  // Function to handle tab switch
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleElementSelect = (id: string, HtmlElement: htmlElement) => {
    setSelectedElement({ id, HtmlElement });
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
            const id = `draggable-${index}`
            return (
              <DraggableItem
                key={index}
                id={id}
                element={<DynamicHTMLContent htmlElement={item} />}
                selectedElementId={selectedElement.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleElementSelect(id, item);
                }}
              />
            );
          })}
        </div>
      )}
      {activeTab === 'configuration' && (
        <div style={styles.tabContent}>
          {selectedElement.HtmlElement ? (
            <ConfigurationComponent configuration={selectedElement.HtmlElement.configuration} />
          ) : (
            <div>Please select an element to configure</div>
          )}
        </div>
      )}
    </div>
  );
};

const DraggableItem: React.FC<DraggableItemProps> = ({ id, element, onMouseDown, selectedElementId }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      element,
    },
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseDown) {
      onMouseDown(event);
    }
    listeners.onMouseDown(event);
  };

  const isSelectedItem = selectedElementId === id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      style={{
        ...styles.draggableItemContainer,
        ...(isSelectedItem ? styles.draggableItemContainerSelected : {}),
      }}
    >
      {element}
    </div>
  );
};

export default Toolbar;