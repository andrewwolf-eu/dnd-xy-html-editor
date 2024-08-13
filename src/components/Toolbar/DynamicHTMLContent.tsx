import React from "react";
import {
  DynamicHTMLContentProps,
} from "DndXYHtmlEditor.types";

export const DynamicHTMLContent: React.FC<DynamicHTMLContentProps> = ({ htmlElement }) => {
  const Element = htmlElement.element;
  return (<Element {...htmlElement.configuration} />);
};