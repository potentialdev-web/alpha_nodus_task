import { all, fork } from "redux-saga/effects";
import { watchOrder } from "store/order/sagas";

const rootSaga = function* () {
  yield all([
    fork(watchOrder),
    // Other forks
  ]);
};

export default rootSaga;
