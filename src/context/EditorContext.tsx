import React, { createContext, useContext, useState, ReactNode } from "react";
import { EditorContextType, htmlElement, VerticalElement } from "../DndXYHtmlEditor.types";

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
  const [htmlElements, setHtmlElements] = useState<htmlElement[]>([])
  const [verticalElements, setVerticalElements] = useState<VerticalElement[]>([
    { id: '0', dimensions: ["100%"], horizontalElements: [] },
  ]);
  const [selectedVerticalElement, setSelectedVerticalElement] = useState<string | null>(null);
  const [selectedHorizontalElement, setSelectedHorizontalElement] = useState<string | null>(null);

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

  const updateVerticalElementHorizontalElements = (verticalElementId: string, horizontalElements: JSX.Element[]) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.map((verticalElement) =>
        verticalElement.id === verticalElementId ? { ...verticalElement, horizontalElements } : verticalElement
      )
    );
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
        updateVerticalElementHorizontalElements,
        updateVerticalElementDimension,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
