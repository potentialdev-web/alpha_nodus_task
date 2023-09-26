import { Order } from "types/OrderType";

export const sampleOrder: Order = {
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
};
