export interface Customer {
  id: number | UUID,
  name: string,
  email: string,
  phoneNumber: string;
  address: string
}

export type UUID = string;
