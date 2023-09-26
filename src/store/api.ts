import { Order } from "types/OrderType";
import { OrderPayloadType } from "./order/types";
import { sampleOrder } from "consts/data";

// mock data as if it came from api
export const mockOrder: OrderPayloadType = {
  data: sampleOrder,
};

export const fetchOrder = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockOrder);
    }, 1000);
  });
};

export const updateOrder = async (updatedOrder: Order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: updatedOrder });
    }, 1000);
  });
};
