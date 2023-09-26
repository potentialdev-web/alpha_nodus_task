import { Order } from "types/OrderType";
import { OrderPayloadType } from "./order/types";

// mock data as if it came from api
export const mockOrder: OrderPayloadType = {
  data: {
    firstName: "Kailynn",
    lastName: "Cormier",
    id: "practitioner/abc123",
    npi: "12975899",
    doNotContact: false,
    address: null,
    specialty: "Cardiology",
    isPriorAuthSubmissionEnabled: true,
    tag: "tag1",
    updatedAt: 1635361234,
    telecom: [
      {
        system: "fax",
        value: "(947)-761-6984",
        use: "work",
        rank: 1,
      },
      {
        system: "phone",
        value: "(977)-973-4171",
        use: "home",
        rank: 2,
      },
    ],
    metadata: {
      id: "metadata123",
      nudgeable: true,
    },
  },
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
