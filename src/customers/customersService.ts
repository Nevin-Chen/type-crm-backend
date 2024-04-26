import { ObjectId } from "mongodb";
import { Customer } from "./customer";
import { collections } from "../services/mongodbService";

export class CustomersService {

  public async getAll(): Promise<Customer[] | null> {
    try {
      const results = await collections.customers?.find().toArray();

      if (!results) return null;

      const customers: Customer[] = results.map((customer) => ({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
      }));

      return customers;
    } catch (error) {
      throw error;
    }
  }

  public async get(id: string): Promise<Customer | null> {
    try {
      const customer = await collections.customers?.findOne({ _id: new ObjectId(id) });

      if (!customer) return null;

      return {
        _id: new ObjectId(customer._id.toString()),
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address
      };
    } catch (error) {
      throw error
    }
  }
}
