export interface DndXYHtmlEditorProps
  extends VerticalElementConfigurationProps,
    ActionButtonProps,
    ToolbarConfigurationProps {
  htmlElements: HtmlElement[];
  translations?: Translations;
  localStorageSave?: boolean;
}

export interface EditorAreaProps
  extends VerticalElementConfigurationProps,
    SelectionProps {
  editorWidthPercent: number;
}

export enum ToolbarTabConfig {
  Elements = "elements",
  Configuration = "configuration",
}

export interface EditorContextType {
  htmlElements: HtmlElement[];
  setHtmlElements: React.Dispatch<React.SetStateAction<HtmlElement[]>>;
  verticalElements: VerticalElement[];
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>;
  selectedVerticalElement: string;
  setSelectedVerticalElement: React.Dispatch<React.SetStateAction<string>>;
  selectedHorizontalElement: string;
  setSelectedHorizontalElement: React.Dispatch<React.SetStateAction<string>>;
  addVerticalElement: () => void;
  removeVerticalElement: (verticalElementId: string) => void;
  removeHorizontalElementFromVerticalElement: (
    verticalElementId: string,
    horizontalElement: JSX.Element
  ) => void;
  updateVerticalElementDimension: (
    verticalElementId: string,
    dimensions: string[]
  ) => void;
  activeTab: ToolbarTabConfig;
  setActiveTab: React.Dispatch<React.SetStateAction<ToolbarTabConfig>>;
  containerHeight: number;
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  containerScale: number[];
  setContainerScale: React.Dispatch<React.SetStateAction<number[]>>;
}

type htmlElementFunction = (props: htmlElementConfiguration) => JSX.Element;

export interface htmlElementConfiguration {
  elementIdentifier: string;
  [key: string]: any;
  keyLabels?: {
    [key: string]: string;
  };
  hideKeysFromConfiguration?: string[];
}

export interface HtmlElement {
  element: htmlElementFunction;
  toolbarPreview?: JSX.Element;
  protected?: boolean;
  immovable?: boolean;
  configuration: htmlElementConfiguration;
}

export interface DynamicHTMLContentProps {
  htmlElement: HtmlElement;
}

export interface Translations {
  toolbar?: {
    elements?: {
      tab?: string;
      info?: string;
    };
    configuration?: {
      tab?: string;
      info?: string;
    };
  };
  actionButtons?: {
    addVerticalElement?: string;
    htmlOutput?: string;
    sendEmail?: string;
    save?: string;
    load?: string;
  };
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
  toolbarPreview?: JSX.Element;
  immovableElement?: boolean;
  onMouseDown: (e: any) => void;
  selectedElementId: string;
}

interface VerticalElementConfigurationProps {
  verticalElementConfiguration?: {
    enableMultipleContainer?: boolean;
    enableDimensionSelector?: boolean;
    defaultContainerWidthInPercentage?: number;
  };
}

interface ActionButtonProps {
  actionButtons?: {
    saveEditorStateAction?: boolean;
    loadEditorStateAction?: boolean;
    htmlOutputAction?: boolean;
    sendEmailAction?: boolean;
  };
}

export interface ToolbarConfigurationProps {
  toolbarConfiguration?: {
    columnsInElements?: number;
  };
}

interface SelectionProps {
  verticalElement: VerticalElement;
}
