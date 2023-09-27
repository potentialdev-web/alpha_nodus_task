import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { NAME, OrderPayloadType, OrderStateType } from "./types";
import { RootStateType } from "store/types";
import { Order } from "types";

const initialState: OrderStateType = {
  order: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export const orderSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    getOrderAction: (state: OrderStateType) => {
      state.order.isLoading = true;
      state.order.error = "";
    },
    getOrderActionSuccess: (
      state: OrderStateType,
      { payload: order }: PayloadAction<OrderPayloadType>
    ) => {
      state.order.data = order.data;
      state.order.isLoading = false;
      state.order.error = "";
    },
    getOrderActionFail: (
      state: OrderStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.order.isLoading = false;
      state.order.error = error;
    },
    updateOrderAction: (
      state: OrderStateType,
      { payload: updatedOrder }: PayloadAction<Order>
    ) => {
      state.order.isLoading = true;
      state.order.error = "";
    },
    updateOrderActionSuccess: (
      state: OrderStateType,
      { payload: order }: PayloadAction<OrderPayloadType>
    ) => {
      state.order.data = order.data;
      state.order.isLoading = false;
      state.order.error = "";
    },
    updateOrderActionFail: (
      state: OrderStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.order.isLoading = false;
      state.order.error = error;
    },
  },
});

const getSlice = (state: RootStateType) => state[NAME] || {};

export const getOrder = createSelector(getSlice, (slice) => slice.order);

export const {
  getOrderAction,
  getOrderActionSuccess,
  getOrderActionFail,
  updateOrderAction,
  updateOrderActionSuccess,
  updateOrderActionFail,
} = orderSlice.actions;

export default orderSlice.reducer;
