import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ConfigurationComponentProps, DraggableItemProps, DynamicHTMLContentProps, HtmlElement, Translations, VerticalElement } from "DndXYHtmlEditor.types";
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
  const { setHtmlElements, setVerticalElements } = useEditor();
  const getInitialState = () => {
    // Initialize the form state based on the configuration object
    const initialState: { [key: string]: any } = {};
    for (const key in configuration) {
      initialState[key] = configuration[key];
    }
    return initialState;
  }
  const [formState, setFormState] = useState(getInitialState);

  useEffect(() => {
    setFormState(getInitialState)
  }, [configuration])

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

    if (configuration.key && !configuration.selectedHorizontalElement) {
      setHtmlElements((prevElements: HtmlElement[]) => {
        return [
          ...prevElements.map(((prevElement: HtmlElement) => {
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
    } else {
      setVerticalElements((prevElements: VerticalElement[]) => {
        return prevElements.map((prevElement: VerticalElement) => {
          if (prevElement.id !== configuration.verticalElement) {
            return prevElement;
          }

          const updatedHorizontalElements = prevElement.horizontalElements.map(horizontalElement => {
            if (horizontalElement.key !== configuration.selectedHorizontalElement) {
              return horizontalElement;
            }

            const updatedProps = horizontalElement.props.hasOwnProperty("htmlElement")
              ? {
                ...horizontalElement.props,
                htmlElement: {
                  ...horizontalElement.props.htmlElement,
                  configuration: {
                    ...horizontalElement.props.htmlElement.configuration,
                    [name]: value
                  }
                }
              }
              : {
                ...horizontalElement.props,
                [name]: value
              };

            return {
              ...horizontalElement,
              props: updatedProps
            };
          });

          return {
            ...prevElement,
            horizontalElements: updatedHorizontalElements
          };
        });
      });
    }
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
      {/* <p>Configuration for: {configuration.key || 'unknown'}</p> */}
      {Object.entries(configuration).map(([key, value]) => {
        if (!(key === 'verticalElement' || key === 'selectedHorizontalElement')) {
          return renderInput(key, value)
        }
      })}
    </div>
  );
};

const ConfigurationForSelectedElement: React.FC<{
  selectedElement: {
    id: string;
    HtmlElement: HtmlElement;
  }, selectedHorizontalElement: string, verticalElements: VerticalElement[], translations: Translations;
}> = ({ selectedElement, selectedHorizontalElement, verticalElements, translations }) => {
  if (selectedElement.HtmlElement) {
    return <ConfigurationComponent configuration={selectedElement.HtmlElement.configuration} />
  }
  if (selectedHorizontalElement) {
    const verticalElement = selectedHorizontalElement.split("-")[0];
    const selectedConatainerElement = verticalElements[verticalElement].horizontalElements.filter((horizontalElement) => horizontalElement.key === selectedHorizontalElement)
    if (selectedConatainerElement.length === 0) {
      return
    }
    if (selectedConatainerElement[0].props.hasOwnProperty("htmlElement")) {
      return <ConfigurationComponent configuration={{ ...selectedConatainerElement[0].props.htmlElement.configuration, verticalElement, selectedHorizontalElement }} />
    } else {
      return <ConfigurationComponent configuration={{ ...selectedConatainerElement[0].props, verticalElement, selectedHorizontalElement }} />
    }
  }

  return <div>{translations?.toolbar?.configuration?.info ?? 'Please select an element to configure'}</div>
}

const Toolbar: React.FC<{ translations: Translations }> = ({ translations }) => {
  const { selectedHorizontalElement, setSelectedHorizontalElement, verticalElements, htmlElements } = useEditor();
  const toolbarhtmlElements = htmlElements ? htmlElements : demoHtmlElements
  // State to manage active tab and selected element
  const [activeTab, setActiveTab] = useState<string>('elements');
  const selectedElementInitState = { id: '', HtmlElement: null }
  const [selectedElement, setSelectedElement] = useState<{ id: string, HtmlElement: HtmlElement }>(selectedElementInitState);

  // Function to handle tab switch
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleElementSelect = (id: string, HtmlElement: HtmlElement) => {
    setSelectedHorizontalElement(null)
    setSelectedElement({ id, HtmlElement });
  };

  useEffect(() => {
    if (selectedHorizontalElement) {
      setSelectedElement(selectedElementInitState);
    }
  }, [
    selectedHorizontalElement
  ])

  return (
    <div style={styles.toolbar}>
      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button onClick={() => handleTabChange('elements')} style={activeTab === 'elements' ? styles.activeTab : styles.tab}>
          {translations?.toolbar?.elements.tab ?? 'Elements'}
        </button>
        <button onClick={() => handleTabChange('configuration')} style={activeTab === 'configuration' ? styles.activeTab : styles.tab}>
          {translations?.toolbar?.configuration.tab ?? 'Configuration'}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'elements' && (
        <div style={styles.tabContent}>
          <div>{translations?.toolbar?.elements?.info ?? 'Please select an element to configure'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(2, 1fr)`, gap: '10px' }}>
            {toolbarhtmlElements.map((item: HtmlElement, index) => {
              const id = `draggable-${index}`;
              return (
                <DraggableItem
                  key={index}
                  id={id}
                  element={<DynamicHTMLContent htmlElement={item} />}
                  toolbarPreview={item.toolbarPreview ? item.toolbarPreview : <DynamicHTMLContent htmlElement={item} />}
                  selectedElementId={selectedElement.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleElementSelect(id, item);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {activeTab === 'configuration' && (
        <div style={styles.tabContent}>
          <ConfigurationForSelectedElement selectedElement={selectedElement} selectedHorizontalElement={selectedHorizontalElement} verticalElements={verticalElements} translations={translations} />
        </div>
      )}
    </div>
  );
};

const DraggableItem: React.FC<DraggableItemProps> = ({ id, element, toolbarPreview, onMouseDown, selectedElementId }) => {
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
      {toolbarPreview}
    </div>
  );
};

export default Toolbar;