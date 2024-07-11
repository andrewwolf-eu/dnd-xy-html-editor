export interface DndXYHtmlEditorProps extends ToolbarProps {}

export interface ToolbarProps {
  htmlElements: React.JSX.Element[];
}

export interface VerticalElement {
  id: number;
  dimensions: string[];
  horizontalElements: JSX.Element[];
}
