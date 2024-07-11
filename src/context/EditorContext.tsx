import React, { createContext, useContext, useState, ReactNode } from "react";
import { VerticalElement } from "../utils/interfaces";

interface EditorContextType {
  verticalElements: VerticalElement[];
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>;
  addVerticalElement: () => void;
  removeVerticalElement: (verticalElementId: number) => void;
  updateVerticalElementHorizontalElements: (verticalElementId: number, horizontalElements: JSX.Element[]) => void;
  updateVerticalElementDimension: (verticalElementId: number, dimensions: string[]) => void;
}

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
  const [verticalElements, setVerticalElements] = useState<VerticalElement[]>([
    { id: 0, dimensions: ["100%"], horizontalElements: [] },
  ]);

  const addVerticalElement = () => {
    setVerticalElements((prevVerticalElements) => [
      ...prevVerticalElements,
      { id: prevVerticalElements.length, dimensions: ["100%"], horizontalElements: [] },
    ]);
  };

  const removeVerticalElement = (verticalElementId: number) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.filter((verticalElement) => verticalElement.id !== verticalElementId)
    );
  };

  const updateVerticalElementHorizontalElements = (verticalElementId: number, horizontalElements: JSX.Element[]) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.map((verticalElement) =>
        verticalElement.id === verticalElementId ? { ...verticalElement, horizontalElements } : verticalElement
      )
    );
  };

  const updateVerticalElementDimension = (verticalElementId: number, dimensions: string[]) => {
    setVerticalElements((prevVerticalElements) =>
      prevVerticalElements.map((verticalElement) =>
        verticalElement.id === verticalElementId ? { ...verticalElement, dimensions } : verticalElement
      )
    );
  };

  return (
    <EditorContext.Provider
      value={{
        verticalElements,
        setVerticalElements,
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
