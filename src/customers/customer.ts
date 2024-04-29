import { ObjectId } from "mongodb";

export interface Customer {
  _id?: ObjectId,
  name: string,
  email: string,
  phoneNumber: string;
  address: string
}

export interface CustomerCreateParams {
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export type CustomerUpdateParams = Partial<Customer>;
