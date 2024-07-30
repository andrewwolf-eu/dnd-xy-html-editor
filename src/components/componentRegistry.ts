import { htmlElementConfiguration } from "DndXYHtmlEditor.types";

const componentRegistry = {};

export const registerComponent = (type: string, component: (props: htmlElementConfiguration) => React.JSX.Element) => {
  componentRegistry[type] = component;
};

export const getComponent = (type: string) => {
  return componentRegistry[type];
};
