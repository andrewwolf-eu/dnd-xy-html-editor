export interface DndXYHtmlEditorProps
  extends VerticalElementConfigurationProps {
  htmlElements: htmlElement[];
}

export interface EditorAreaProps
  extends VerticalElementConfigurationProps,
    SelectionProps {}

export interface EditorContextType {
  htmlElements: htmlElement[];
  setHtmlElements: React.Dispatch<React.SetStateAction<htmlElement[]>>;
  verticalElements: VerticalElement[];
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>;
  selectedVerticalElement: string;
  setSelectedVerticalElement: React.Dispatch<React.SetStateAction<string>>;
  selectedHorizontalElement: string;
  setSelectedHorizontalElement: React.Dispatch<React.SetStateAction<string>>;
  addVerticalElement: () => void;
  removeVerticalElement: (verticalElementId: string) => void;
  updateVerticalElementHorizontalElements: (
    verticalElementId: string,
    horizontalElements: JSX.Element[]
  ) => void;
  updateVerticalElementDimension: (
    verticalElementId: string,
    dimensions: string[]
  ) => void;
}

type htmlElementFunction = (props: htmlElementConfiguration) => JSX.Element;

export interface htmlElementConfiguration {
  [key: string]: any;
}

export interface htmlElement {
  element: htmlElementFunction;
  configuration: htmlElementConfiguration;
}

export interface DynamicHTMLContentProps {
  htmlElement: htmlElement;
}

export interface ConfigurationComponentProps {
  configuration: htmlElementConfiguration;
}

export interface VerticalElement {
  id: string;
  dimensions: string[];
  horizontalElements: JSX.Element[];
}

export interface DraggableItemProps {
  id: string;
  element: JSX.Element;
  onMouseDown: (e: any) => void;
  selectedElementId: string;
}

interface VerticalElementConfigurationProps {
  verticalElementConfiguration?: {
    enableDelete?: boolean;
    enableDimensionSelector?: boolean;
  };
}

interface SelectionProps {
  verticalElement: VerticalElement;
  onVerticalElementClick: (verticalElementId: string) => void;
  onHorizontalElementClick: (horizontalElementId: string) => void;
}
