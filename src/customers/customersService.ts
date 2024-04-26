import { ObjectId } from "mongodb";
import { Customer } from "./customer";
import { collections } from "../services/mongodbService";

export class CustomersService {

  public async getAll(): Promise<Customer[]> {
    try {
      const result = await collections.customers?.find().toArray();

      if (result) {
        const customers: Customer[] = result.map((customer) => ({
          _id: customer._id,
          name: customer.name,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
        }));
        return customers;
      } else {
        throw Error
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }

  public async get(id: string): Promise<Customer> {
    try {
      const customer = await collections.customers?.findOne({ _id: new ObjectId(id) });

      if (customer) {
        return {
          _id: new ObjectId(customer._id.toString()),
          name: customer.name,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address
        };
      } else {
        throw Error;
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  }
}
