export type Telecom = {
  system: string;
  value: string;
  use: string | null;
  rank: number;
};

export type Metadata = {
  id: string;
  nudgeable: boolean;
};

export type Order = {
  firstName: string;
  lastName: string;
  id: string;
  npi: string | null;
  doNotContact: boolean | null;
  address: string | null;
  specialty: string | null;
  isPriorAuthSubmissionEnabled: boolean | null;
  tag: string | null;
  updatedAt: number | null;
  telecom: Telecom[];
  metadata: Metadata;
};
