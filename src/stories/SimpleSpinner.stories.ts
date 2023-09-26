import type { Meta, StoryObj } from "@storybook/react";

import { SimpleSpinner, SimpleSpinnerProps } from "components";

const meta = {
  title: "Components/SimpleSpinner",
  component: SimpleSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<SimpleSpinnerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animation: "border",
  },
};
