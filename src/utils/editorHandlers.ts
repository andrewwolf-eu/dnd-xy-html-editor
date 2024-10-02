import React from "react";
import ReactDOMServer from "react-dom/server";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import * as cheerio from "cheerio";
import { getComponent } from "../components/componentRegistry";
import { VerticalElement } from "../DndXYHtmlEditor.types";
import { EmailAttachment } from "smtp-server/types";

// Utility to serialize elements
const serializeElement = (horizontalElements: JSX.Element) => {
  const htmlElementProps = horizontalElements.props.htmlElement
    ? horizontalElements.props.htmlElement.configuration
    : horizontalElements.props;

  const customActions = Object.keys(htmlElementProps)
    .filter((key) => key.startsWith("customAction"))
    .reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});

  const serializedProps = {
    ...htmlElementProps,
    ...customActions,
  };

  return {
    key: horizontalElements.key,
    props: serializedProps,
  };
};

// Utility to deserialize elements
const deserializeElement = (serializedElement: any) => {
  const htmlElementIdentifier = serializedElement.props.htmlElement
    ? serializedElement.props.htmlElement.configuration.elementIdentifier
    : serializedElement.props.elementIdentifier;
  const htmlElementProps = serializedElement.props.htmlElement
    ? serializedElement.props.htmlElement.configuration
    : serializedElement.props;

  // Rebuild the customAction function based on the identifier
  let customActions = {};

  // Find all keys that start with 'customAction'
  const customActionKeys = Object.keys(htmlElementProps).filter((key) =>
    key.startsWith("customAction")
  );

  // If customActionKeys are found, get the corresponding components
  if (customActionKeys.length > 0) {
    customActions = customActionKeys.reduce((acc, key) => {
      acc[key] = getComponent(`${htmlElementIdentifier}_${key}`);
      return acc;
    }, {});
  }

  const Component = getComponent(htmlElementIdentifier);

  return React.createElement(
    Component,
    {
      ...htmlElementProps,
      key: serializedElement.key,
      ...customActions, // Include all dynamic customActions
    },
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
  setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  containerScale: number[],
  setContainerScale: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const { active, over } = event;
  const activeId = active.id as string;
  const overId = over?.id as string;

  setActiveId(null);
  setActiveElement(null);

  if (!over) return;

  const checkIfLastIsImmovable = (activeEditorIndex: string) => {
    return verticalElements[activeEditorIndex]?.horizontalElements.length === 0
      ? false
      : verticalElements[activeEditorIndex]?.horizontalElements[
          verticalElements[activeEditorIndex]?.horizontalElements.length - 1
        ].key.includes("immovable");
  };

  const cloneElementAndAddToHorizontalElements = (
    verticalElementId: string,
    pushIntoBeforeLast?: boolean
  ) => {
    if (active.data.current.element) {
      const newElement = React.cloneElement(active.data.current.element, {
        key: `${verticalElementId}-${
          verticalElements[verticalElementId]?.horizontalElements.length
        }${
          active.data.current.element.props.htmlElement.immovable
            ? "-immovable"
            : ""
        }${
          active.data.current.element.props.htmlElement.protected
            ? "-protected"
            : ""
        }`,
      });

      setVerticalElements((prevVerticalElements) => {
        const newVerticalElements = prevVerticalElements.map(
          (verticalElement) => {
            let newHorizontalElements = [
              ...verticalElement.horizontalElements,
              newElement,
            ]; // Add to the end of the array;
            if (pushIntoBeforeLast) {
              newHorizontalElements = [
                ...verticalElement.horizontalElements.slice(0, -1), // All elements except the last one
                newElement, // Insert the new element before the last one
                verticalElement.horizontalElements[
                  verticalElement.horizontalElements.length - 1
                ], // Append the last element
              ];
            }

            return verticalElement.id === verticalElementId
              ? {
                  ...verticalElement,
                  horizontalElements: newHorizontalElements,
                }
              : verticalElement;
          }
        );
        return newVerticalElements;
      });
    }
  };

  if (activeId.startsWith("editor-") && overId.startsWith("editor-")) {
    // console.log("Case 1: when you move the vertical element area");
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
    // console.log("Case 2: when you move horizontal element into the vertical element area");
    const verticalElementId = parseInt(overId.split("-")[2], 10).toString();
    cloneElementAndAddToHorizontalElements(
      verticalElementId,
      checkIfLastIsImmovable(verticalElementId)
    );
  } else if (activeId !== overId) {
    // console.log("Case 3: when you move horizontal element iniside the vertical element area");
    if (activeId.includes("draggable")) {
      const activeEditorIndex = parseInt(overId.split("-")[0], 10).toString();
      cloneElementAndAddToHorizontalElements(
        activeEditorIndex,
        checkIfLastIsImmovable(activeEditorIndex)
      );
    } else {
      if (overId.includes("immovable")) {
        return;
      }
      const arrayMove = (array, fromIndex, toIndex) => {
        const newArray = [...array]; // Create a shallow copy to avoid mutating the original array
        const [movedItem] = newArray.splice(fromIndex, 1); // Remove the item from the fromIndex
        newArray.splice(toIndex, 0, movedItem); // Insert the item at the toIndex
        return newArray;
      };

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
            const newContainerScale = arrayMove(
              containerScale,
              oldIndex,
              newIndex
            );
            setContainerScale(newContainerScale);
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
  }
};

export const handleSave: (
  verticalElements: VerticalElement[],
  localStorageSave?: boolean
) => string = (verticalElements, localStorageSave) => {
  try {
    const serializedVerticalElements = verticalElements.map(
      (verticalElement) => ({
        ...verticalElement,
        horizontalElements:
          verticalElement.horizontalElements.map(serializeElement),
      })
    );
    if (localStorageSave) {
      localStorage.setItem(
        "DndXYHtmlEditor",
        JSON.stringify(serializedVerticalElements)
      );
    }
    console.log("Saved successfully!");
    return JSON.stringify(serializedVerticalElements);
  } catch (error) {
    console.error("Error saving state", error);
  }
};

export const handleLoad = (
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>,
  localStorageSave?: boolean,
  editorState?: string
) => {
  try {
    let savedVerticalElements = editorState;
    if (localStorageSave) {
      savedVerticalElements = localStorage.getItem("DndXYHtmlEditor");
    }
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
    console.error("Error loading from state", error);
  }
};

const convertElementToHTML = (element: JSX.Element): string => {
  return ReactDOMServer.renderToString(element);
};

export const handleOutput = (
  verticalElements: VerticalElement[],
  preview: boolean = false,
  cidBasedImageEmbedding: boolean = true,
  plainText: string = ""
) => {
  let notAllVerticalElementelementDimensionIsFullWidth = false;
  const htmlContent = verticalElements
    .map((verticalElement) => {
      // Check if dimension is 100%
      const isFullWidth = verticalElement.dimensions.some((d) => d === "100%");

      if (isFullWidth) {
        // If dimension is 100%, each element gets its own container
        return verticalElement.horizontalElements
          .map((element) => convertElementToHTML(element))
          .join("");
      }

      notAllVerticalElementelementDimensionIsFullWidth = true;

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

  // Load the HTML content into Cheerio
  const $ = cheerio.load(`<html><body>${htmlContent}</body></html>`);

  // Array to hold the attachment objects
  const attachments: EmailAttachment[] = [];

  $("img").each(function (index) {
    const src = $(this).attr("src");
    if (src) {
      const urlWithoutQuery = src.split("?")[0]; // Remove query parameters
      const ext = urlWithoutQuery.split(".").pop(); // Get the file extension
      const filename = `image${index + 1}.${ext}`;
      const cid = `image${index + 1}`;

      attachments.push({
        filename: filename,
        path: src,
        cid: cid,
      });

      // Update the src attribute to use CID
      if (cidBasedImageEmbedding) {
        $(this).attr("src", `cid:${cid}`);
      }
    }
  });

  // Get the updated HTML content after modifying img tags
  const updatedHtmlContent = $("body").html();

  const extraStyleSheet = notAllVerticalElementelementDimensionIsFullWidth
    ? `<head>
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
              min-height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              flex-grow: 1;
              flex-shrink: 0;
            }
          </style>
        </head>`
    : "";

  const formattedHtmlContent = `
  <html>
      ${extraStyleSheet}
    <body>
      ${!preview && cidBasedImageEmbedding ? updatedHtmlContent : htmlContent}
    </body>
  </html>
`;

  // Optionally open the formatted content in a new window
  if (preview) {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(formattedHtmlContent);
      newWindow.document.close();
    }
  }

  // If plainText is provided, generate the plain text email content
  let plainTextOutput = "";
  if (plainText) {
    // Basic conversion to plain text, stripping out HTML tags
    plainTextOutput = plainText;
  } else {
    // Convert the HTML content to plain text (basic stripping of HTML tags)
    plainTextOutput = $.text();
  }

  // Return the output based on the cidBasedImageEmbedding and plainText
  if (cidBasedImageEmbedding) {
    return {
      htmlOutput: formattedHtmlContent,
      attachments: attachments,
      plainTextOutput: plainTextOutput,
    };
  } else {
    return {
      htmlOutput: formattedHtmlContent,
      plainTextOutput: plainTextOutput,
    };
  }
};
