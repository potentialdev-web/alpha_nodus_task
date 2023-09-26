import { combineReducers } from "@reduxjs/toolkit";

import orderReducer from "store/order/slice";
import { NAME as orderName } from "store/order/types";

const rootReducer = combineReducers({
  [orderName]: orderReducer,
});

export default rootReducer;
