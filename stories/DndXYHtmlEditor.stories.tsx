import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";
import { DndXYHtmlEditorProps, HtmlElement } from "DndXYHtmlEditor.types";
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

const htmlElements: HtmlElement[] = [
  {
    element: DivElement,
    toolbarPreview: <p>{'DivElement'}</p>,
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
    toolbarPreview: <p>{'ImageElement'}</p>,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      src: 'https://via.placeholder.com/50',
      alt: 'Configured Image Element',
    },
  },
  {
    element: TextElement,
    toolbarPreview: <p>{'TextElement'}</p>,
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
      enableMultipleContainer: true,
      enableDimensionSelector: true
    },
    /* formattedHtmlOutput: (htmlOutput: string) => {
      console.log({ htmlOutput })
    } */
    translations: {
      toolbar: {
        elements: {
          tab: 'Elements',
          info: 'Add content to the newsletter, or you can use the one in the template. Drag the element to the left, and then you can edit it.',
        },
        configuration: {
          tab: 'Configuration',
          info: 'Please select an element to configure',
        },
      },
      actionButtons: {
        addVerticalElement: 'Add Vertical Element',
        htmlOutput: 'HTML Output',
        sendEmail: 'Send e-mail',
        save: 'Save',
        load: 'Load',
      },
    },
  },
};
