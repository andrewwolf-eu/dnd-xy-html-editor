import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";
import { DndXYHtmlEditorProps, htmlElement } from "DndXYHtmlEditor.types";
import { DivElement, ImageElement, TextElement } from "../src/components/DemoHtmlElements";

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

const htmlElements: htmlElement[] = [
  {
    element: DivElement,
    configuration: {
      elementIdentifier: 'DivElement',
      key: 'div-element',
      title: 'Div Element Title1',
      description: 'Div Element Description1',
      titleStyle: { fontWeight: 'bold', color: 'blue' },
      descriptionStyle: { fontStyle: 'italic' },
    },
  },
  {
    element: ImageElement,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      src: 'https://via.placeholder.com/50',
      alt: 'Configured Image Element',
    },
  },
  {
    element: TextElement,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
    },
  },
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
    },
    /* formattedHtmlOutput: (htmlOutput: string) => {
      console.log({ htmlOutput })
    } */
  },
};
