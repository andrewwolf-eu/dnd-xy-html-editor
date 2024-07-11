import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";

const meta = {
  title: "Demo/DndXYHtmlEditor",
  component: DndXYHtmlEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof DndXYHtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <div style={{ width: '100%', height: '100%' }}>
      <DndXYHtmlEditor />
    </div>
  ),
  args: {},
};
