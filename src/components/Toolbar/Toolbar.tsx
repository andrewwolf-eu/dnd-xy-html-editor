import React, { useEffect, useState } from "react";
import { DynamicHTMLContent } from "./DynamicHTMLContent";
import { ConfigurationForSelectedElement } from "./ConfigurationForSelectedElement";
import { DraggableItem } from "./DraggableItem";
import {
  HtmlElement,
  Translations,
  ToolbarConfigurationProps
} from "DndXYHtmlEditor.types";
import { styles } from "./Toolbar.styles";
import { demoHtmlElements } from "../Demo/DemoHtmlElements";
import { useEditor } from "../../context/EditorContext";

const Toolbar: React.FC<ToolbarConfigurationProps & { translations: Translations }> = ({ toolbarConfiguration, translations }) => {
  const { selectedHorizontalElement, setSelectedHorizontalElement, verticalElements, htmlElements } = useEditor();
  const toolbarhtmlElements = htmlElements.length > 0 ? htmlElements : demoHtmlElements
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
      <div>
        <button type='button' onClick={() => handleTabChange('elements')} style={activeTab === 'elements' ? styles.activeTab : styles.tab}>
          {translations?.toolbar?.elements.tab ?? 'Elements'}
        </button>
        <button type='button' onClick={() => handleTabChange('configuration')} style={activeTab === 'configuration' ? styles.activeTab : styles.tab}>
          {translations?.toolbar?.configuration.tab ?? 'Configuration'}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'elements' && (
        <div style={styles.tabContainer}>
          <div>{translations?.toolbar?.elements?.info ?? 'Add content to the newsletter, or you can use the one in the template. Drag the element to the left, and then you can edit it.'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${toolbarConfiguration.columnsInElements}, 1fr)` }}>
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
        <div style={styles.tabContainer}>
          <ConfigurationForSelectedElement selectedElement={selectedElement} selectedHorizontalElement={selectedHorizontalElement} verticalElements={verticalElements} translations={translations} />
        </div>
      )}
    </div>
  );
};

export default Toolbar;