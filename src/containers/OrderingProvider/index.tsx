import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OrderingProvider } from "components";

import { getOrder, getOrderAction, updateOrderAction } from "store/order/slice";
import { Order } from "types";

export const OrderingProviderContainer = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(getOrder);

  const updateOrder = (updatedOrder: Order) =>
    dispatch(updateOrderAction(updatedOrder));

  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  return (
    <OrderingProvider
      order={data}
      isLoading={isLoading}
      error={error}
      updateOrder={updateOrder}
    />
  );
};
