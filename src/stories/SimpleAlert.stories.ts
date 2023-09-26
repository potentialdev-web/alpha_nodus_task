import type { Meta, StoryObj } from "@storybook/react";

import { SimpleAlert, SimpleAlertProps } from "components";
import { sampleOrder } from "consts/data";

const meta = {
  title: "Components/SimpleAlert",
  component: SimpleAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<SimpleAlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    msg: "This is a primary alert.",
  },
};
