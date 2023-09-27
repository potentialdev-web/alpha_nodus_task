import type { Meta, StoryObj } from "@storybook/react";

import { OrderModal, OrderModalProps } from "components";
import { sampleOrder } from "consts";

const meta = {
  title: "Components/OrderModal",
  component: OrderModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<OrderModalProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    onHide: () => {},
    title: "Order Modal",
    order: sampleOrder,
    updateOrder: () => {},
  },
};
