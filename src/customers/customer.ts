import { ObjectId } from "mongodb";

export interface Customer {
  _id: ObjectId,
  name: string,
  email: string,
  phoneNumber: string;
  address: string
}
