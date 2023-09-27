import { put, takeLatest } from "redux-saga/effects";
import {
  getOrderAction,
  getOrderActionSuccess,
  getOrderActionFail,
  updateOrderAction,
  updateOrderActionSuccess,
  updateOrderActionFail,
} from "store/order/slice";
import { OrderPayloadType } from "./types";
import { fetchOrder, updateOrder } from "store/api";
import { Order } from "types";

// Fetch a specific order information
function* getOrderSaga() {
  try {
    const response: OrderPayloadType = yield fetchOrder();
    yield put(getOrderActionSuccess(response));
  } catch (error) {
    yield put(getOrderActionFail(`${error}`));
  }
}

function* updateOrderSaga({ payload: updatedOrder }: { payload: Order }) {
  try {
    const response: OrderPayloadType = yield updateOrder(updatedOrder);
    yield put(updateOrderActionSuccess(response));
  } catch (error) {
    yield put(updateOrderActionFail(`${error}`));
  }
}

export function* watchOrder() {
  yield takeLatest(getOrderAction.type as any, getOrderSaga);
  yield takeLatest(updateOrderAction.type as any, updateOrderSaga);
}
