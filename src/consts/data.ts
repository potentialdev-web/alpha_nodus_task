import { Order } from "types";

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
      system: "Fax",
      value: "(947)-761-6984",
      use: "Work",
      rank: 1,
    },
    {
      system: "Phone",
      value: "(977)-973-4171",
      use: "Home",
      rank: 2,
    },
  ],
  metadata: {
    id: "metadata123",
    nudgeable: true,
  },
};
