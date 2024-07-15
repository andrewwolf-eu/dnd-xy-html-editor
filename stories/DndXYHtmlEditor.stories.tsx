import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";
import { DndXYHtmlEditorProps } from "DndXYHtmlEditor.types";

const meta = {
  title: "Demo/DndXYHtmlEditor",
  component: DndXYHtmlEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DndXYHtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const htmlElements = [
  <div key="div-element">
    Div Element
  </div>,
  <img
    key="image-element"
    src="https://via.placeholder.com/50"
    alt="Image Element"
  />,
  <p key="text-element">
    Text Element
  </p>,
];

export const Demo: Story = {
  render: (args: DndXYHtmlEditorProps) => {
    return (<DndXYHtmlEditor {...args} />)
  },
  args: {
    htmlElements,
    verticalElementConfiguration: {
      enableDelete: true,
      enableDimensionSelector: true
    }
  },
};
