import React, { createContext, useContext, useState, ReactNode } from "react";
import { EditorContextType, HtmlElement, VerticalElement, ToolbarTabConfig } from "../DndXYHtmlEditor.types";

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
};

export const EditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [htmlElements, setHtmlElements] = useState<HtmlElement[]>([])
  const [verticalElements, setVerticalElements] = useState<VerticalElement[]>([
    { id: '0', dimensions: ["100%"], horizontalElements: [] },
  ]);
  const [selectedVerticalElement, setSelectedVerticalElement] = useState<string | null>(null);
  const [selectedHorizontalElement, setSelectedHorizontalElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ToolbarTabConfig>(ToolbarTabConfig.Elements);
  const [containerHeight, setContainerHeight] = useState<number>(window.innerHeight);
  const [containerScale, setContainerScale] = useState<number[]>([]);

  const addVerticalElement = () => {
    setVerticalElements((prevVerticalElements) => [
      ...prevVerticalElements,
      { id: prevVerticalElements.length.toString(), dimensions: ["100%"], horizontalElements: [] },
    ]);
  };

  const removeVerticalElement = (verticalElementId: string) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.filter((verticalElement) => verticalElement.id !== verticalElementId)
    );
  };

  const removeHorizontalElementFromVerticalElement = (verticalElementId: string, horizontalElement: JSX.Element) => {
    setVerticalElements((prevVerticalElements: VerticalElement[]) => {
      return prevVerticalElements.map((verticalElement: VerticalElement) => {
        if (verticalElement.id === verticalElementId) {
          // Filter out the element to be removed
          const updatedHorizontalElements = verticalElement.horizontalElements.filter(
            horizontalEl => horizontalEl.key !== horizontalElement.key
          );

          // Regenerate the keys based on the index in the array
          const rekeyedHorizontalElements = updatedHorizontalElements.map((horizontalEl, index) => {
            const keyParts = horizontalEl.key.split('-');

            let newKey = `${verticalElementId}-${index}`
            if (keyParts.length > 2) {
              const configurationParts = keyParts.slice(2).join('-');
              newKey = `${verticalElementId}-${index}-${configurationParts}`
            }

            return {
              ...horizontalEl,
              key: newKey
            };
          });

          // Return the updated vertical element with rekeyed horizontal elements
          return {
            ...verticalElement,
            horizontalElements: rekeyedHorizontalElements
          };
        } else {
          return verticalElement;
        }
      });
    });
  };

  const updateVerticalElementDimension = (verticalElementId: string, dimensions: string[]) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.map((verticalElement) =>
        verticalElement.id === verticalElementId ? { ...verticalElement, dimensions } : verticalElement
      )
    );
  };

  return (
    <EditorContext.Provider
      value={{
        htmlElements,
        setHtmlElements,
        verticalElements,
        setVerticalElements,
        selectedVerticalElement,
        setSelectedVerticalElement,
        selectedHorizontalElement,
        setSelectedHorizontalElement,
        addVerticalElement,
        removeVerticalElement,
        removeHorizontalElementFromVerticalElement,
        updateVerticalElementDimension,
        activeTab,
        setActiveTab,
        containerHeight,
        setContainerHeight,
        containerScale,
        setContainerScale,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
