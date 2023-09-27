import type { Meta, StoryObj } from "@storybook/react";

import { OrderingProvider, OrderingProviderProps } from "components";
import { sampleOrder } from "consts";

const meta = {
  title: "Components/OrderingProvider",
  component: OrderingProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<OrderingProviderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    order: null,
    isLoading: true,
    error: null,
    updateOrder: () => {},
  },
};

export const Error: Story = {
  args: {
    order: null,
    isLoading: false,
    error: "Failed to load data",
    updateOrder: () => {},
  },
};

export const Default: Story = {
  args: {
    order: sampleOrder,
    isLoading: false,
    error: null,
    updateOrder: () => {},
  },
};
