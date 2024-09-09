import React, { useRef, useState } from "react";
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
    const [editorState, setEditorState] = useState<string>('')
    const htmlEditorRef = useRef(null);

    const loadState = (editorState: string) => {
      if (htmlEditorRef.current) {
        htmlEditorRef.current.loadState(editorState);
      }
    };

    const saveState = () => {
      if (htmlEditorRef.current) {
        const state = htmlEditorRef.current.saveState();
        setEditorState(state)
      }
    };

    const htmlPreview = () => {
      if (htmlEditorRef.current) {
        htmlEditorRef.current.htmlPreview();
      }
    };

    const htmlOutput = (attachmentsWithCid?: boolean, plainText?: string) => {
      if (htmlEditorRef.current) {
        const htmlOutput = htmlEditorRef.current.htmlOutput(attachmentsWithCid, plainText);
        console.log({ htmlOutput })
      }
    };

    return (<>
      <button type='button' onClick={() => loadState(editorState)}>Load State</button>
      <button type='button' onClick={saveState}>Save State</button>
      <button type='button' onClick={htmlPreview}>HTML Preview</button>
      <button type='button' onClick={() => htmlOutput(true, 'plainTextBody')}>HTML Output</button>
      <DndXYHtmlEditor ref={htmlEditorRef} {...args} />
    </>)
  },
  args: {
    htmlElements: demoHtmlElements,
    localStorageSave: true,
    verticalElementConfiguration: {
      enableMultipleContainer: true,
      enableDimensionSelector: true,
      defaultContainerWidthInPercentage: 70,
    },
    actionButtons: {
      saveEditorStateAction: true,
      loadEditorStateAction: true,
      htmlOutputAction: true,
      sendEmailAction: true,
    },
    toolbarConfiguration: {
      columnsInElements: 2,
    },
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
