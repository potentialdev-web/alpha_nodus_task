import { Order } from "types/OrderType";

export type IOrderState = {
  data: Order | null;
  isLoading: boolean;
  error: string | null;
};

export type OrderStateType = {
  order: IOrderState;
};

export type OrderPayloadType = {
  data: Order | null;
};

export const NAME = "order";
export type NAME = typeof NAME;
