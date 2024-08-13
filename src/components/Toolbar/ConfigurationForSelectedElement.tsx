import React from "react";
import { ConfigurationComponent } from "./ConfigurationComponent";
import {
  HtmlElement,
  Translations,
  VerticalElement,
} from "DndXYHtmlEditor.types";

export const ConfigurationForSelectedElement: React.FC<{
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