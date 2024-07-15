export interface DndXYHtmlEditorProps extends VerticalElementConfigurationProps, ToolbarProps {}

export interface EditorAreaProps extends VerticalElementConfigurationProps, SelectionProps {}

export interface EditorContextType {
  verticalElements: VerticalElement[];
  setVerticalElements: React.Dispatch<React.SetStateAction<VerticalElement[]>>;
  addVerticalElement: () => void;
  removeVerticalElement: (verticalElementId: number) => void;
  updateVerticalElementHorizontalElements: (verticalElementId: number, horizontalElements: JSX.Element[]) => void;
  updateVerticalElementDimension: (verticalElementId: number, dimensions: string[]) => void;
}

export interface ToolbarProps {
  htmlElements?: React.JSX.Element[];
}

export interface VerticalElement {
  id: number;
  dimensions: string[];
  horizontalElements: JSX.Element[];
}

interface VerticalElementConfigurationProps {
  verticalElementConfiguration?: {
    enableDelete?: boolean;
    enableDimensionSelector?: boolean;
  };
}

interface SelectionProps {
  verticalElement: VerticalElement;
  selectedVerticalElement: number | null;
  selectedHorizontalElement: string | null;
  onVerticalElementClick: (verticalElementId: number) => void;
  onHorizontalElementClick: (horizontalElementId: string) => void;
}
