import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";
import { DndXYHtmlEditorProps } from "DndXYHtmlEditor.types";
import { demoHtmlElements } from "../src/components/Demo/DemoHtmlElements";

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

export const Demo: Story = {
  render: (args: DndXYHtmlEditorProps) => {
    return (<DndXYHtmlEditor {...args} />)
  },
  args: {
    htmlElements: demoHtmlElements,
    verticalElementConfiguration: {
      enableMultipleContainer: true,
      enableDimensionSelector: true,
      defaultContainerWidthInPercentage: 70,
    },
    toolbarConfiguration: {
      columnsInElements: 2,
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
