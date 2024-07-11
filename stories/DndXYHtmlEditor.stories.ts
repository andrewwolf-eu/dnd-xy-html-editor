import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DndXYHtmlEditor } from "../src/DndXYHtmlEditor";

const meta = {
  title: "Demo/DndXYHtmlEditor",
  component: DndXYHtmlEditor,
  parameters: {
    layout: "centered",
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
  args: {
    primary: true,
    label: "DndXYHtmlEditor",
  },
};
