import { Order } from "types";

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
export type NAME_TYPE = typeof NAME;
