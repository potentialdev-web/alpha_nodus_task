import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
