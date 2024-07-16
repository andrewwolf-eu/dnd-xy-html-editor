import React from "react";
import ReactDOMServer from "react-dom/server";
import { arrayMove } from "@dnd-kit/sortable";
import { VerticalElement } from "../DndXYHtmlEditor.types";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

// Utility to serialize elements
const serializeElement = (horizontalElements: JSX.Element) => {
  return {
    type: horizontalElements.type,
    key: horizontalElements.key,
    props: horizontalElements.props,
  };
};

// Utility to deserialize elements
const deserializeElement = (serializedElement: any) => {
  return React.createElement(
    serializedElement.type,
    { ...serializedElement.props, key: serializedElement.key },
    serializedElement.props.children
  );
};

export const handleDragStart = (
  event: DragStartEvent,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>
) => {
  setActiveId(event.active.id as string);
  setActiveElement(event.active.data.current?.element || null);
};

export const handleDragEnd = (
  event: DragEndEvent,
  verticalElements: VerticalElement[],
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>
) => {
  const { active, over } = event;
  const activeId = active.id as string;
  const overId = over?.id as string;

  setActiveId(null);
  setActiveElement(null);

  if (!over) return;

  if (activeId.startsWith("editor-") && overId.startsWith("editor-")) {
    // Case when you move the vertical element area
    setVerticalElements((prevVerticalElements) => {
      const oldIndex = prevVerticalElements.findIndex(
        (verticalElement) => `editor-${verticalElement.id}` === activeId
      );
      const newIndex = prevVerticalElements.findIndex(
        (verticalElement) => `editor-${verticalElement.id}` === overId
      );
      return arrayMove(prevVerticalElements, oldIndex, newIndex);
    });
  } else if (active.data.current && overId.startsWith("editor-area-")) {
    // Case when you move horizontal element into the vertical element area
    const verticalElementId = parseInt(overId.split("-")[2], 10).toString();
    if (active.data.current.element) {
      const newElement = React.cloneElement(active.data.current.element, {
        key: `${verticalElementId}-${
          verticalElements.find(
            (verticalElement) => verticalElement.id === verticalElementId
          )?.horizontalElements.length
        }`,
      });

      setVerticalElements((prevVerticalElements) => {
        const newVerticalElements = prevVerticalElements.map(
          (verticalElement) =>
            verticalElement.id === verticalElementId
              ? {
                  ...verticalElement,
                  horizontalElements: [
                    ...verticalElement.horizontalElements,
                    newElement,
                  ],
                }
              : verticalElement
        );
        return newVerticalElements;
      });
    } else {
    }
  } else if (activeId !== overId) {
    // Case when you move horizontal element iniside the vertical element area
    setVerticalElements((prevVerticalElements) => {
      return prevVerticalElements.map((verticalElement) => {
        if (
          verticalElement.horizontalElements.some((el) => el.key === activeId)
        ) {
          const oldIndex = verticalElement.horizontalElements.findIndex(
            (element) => element.key === activeId
          );
          const newIndex = verticalElement.horizontalElements.findIndex(
            (element) => element.key === overId
          );
          return {
            ...verticalElement,
            horizontalElements: arrayMove(
              verticalElement.horizontalElements,
              oldIndex,
              newIndex
            ),
          };
        }
        return verticalElement;
      });
    });
  }
};

export const handleSave = (verticalElements: VerticalElement[]) => {
  try {
    const serializedVerticalElements = verticalElements.map(
      (verticalElement) => ({
        ...verticalElement,
        horizontalElements:
          verticalElement.horizontalElements.map(serializeElement),
      })
    );
    localStorage.setItem(
      "DndXYHtmlEditor",
      JSON.stringify(serializedVerticalElements)
    );
    console.log("Saved successfully!");
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const handleLoad = (
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>
) => {
  try {
    const savedVerticalElements = localStorage.getItem("DndXYHtmlEditor");
    if (savedVerticalElements) {
      const parsedVerticalElements = JSON.parse(savedVerticalElements).map(
        (verticalElement: VerticalElement) => ({
          ...verticalElement,
          horizontalElements:
            verticalElement.horizontalElements.map(deserializeElement),
        })
      );
      setVerticalElements(parsedVerticalElements);
      console.log("Loaded vertical elements:", parsedVerticalElements);
    }
  } catch (error) {
    console.error("Error loading from localStorage", error);
  }
};

const convertElementToHTML = (element: JSX.Element): string => {
  return ReactDOMServer.renderToString(element);
};

export const handleOutput = (
  verticalElements: VerticalElement[],
  formattedHtmlOutput?: (htmlOutput: string) => void
) => {
  const htmlContent = verticalElements
    .map((verticalElement) => {
      const rows: JSX.Element[][] = [];
      for (
        let i = 0;
        i < verticalElement.horizontalElements.length;
        i += verticalElement.dimensions.length
      ) {
        rows.push(
          verticalElement.horizontalElements.slice(
            i,
            i + verticalElement.dimensions.length
          )
        );
      }

      const verticalElementHtml = rows
        .map((row) => {
          const rowContent = row
            .map((element, index) => {
              const flexBasis =
                verticalElement.dimensions[
                  index % verticalElement.dimensions.length
                ];
              return `<div class="flex-column" style="flex-basis: ${flexBasis}; flex-grow: 1; flex-shrink: 0;">${convertElementToHTML(element)}</div>`;
            })
            .join("");
          return `<div class="flex-row">${rowContent}</div>`;
        })
        .join("");

      return `<div class="flex-container">${verticalElementHtml}</div>`;
    })
    .join("");

  const formattedHtmlContent = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
            }
            .flex-container {
              display: flex;
              flex-direction: column;
            }
            .flex-row {
              display: flex;
              width: 100%;
            }
            .flex-column {
              border: 1px solid #ddd;
              background-color: #fff;
              min-height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              flex-grow: 1;
              flex-shrink: 0;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

  formattedHtmlOutput && formattedHtmlOutput(formattedHtmlContent);

  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(formattedHtmlContent);
    newWindow.document.close();
  }
};
