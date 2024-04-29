import { ObjectId } from "mongodb";
import { Customer, CustomerCreateParams, CustomerUpdateParams } from "./customer";
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
      throw error;
    }
  }

  public async create(customerData: CustomerCreateParams): Promise<Customer> {
    try {
      const result = await collections.customers?.insertOne(customerData);
      if (!result) throw new Error();
      return customerData as Customer;
    } catch (error) {
      throw Error(`Error occurred while creating customer: ${error}`);
    }
  }

  public async update(id: string, customerData: CustomerUpdateParams): Promise<boolean> {
    try {
      const result = await collections.customers?.updateOne({ _id: new ObjectId(id) }, { $set: customerData });
      if (!result) throw Error();
      return result.acknowledged;
    } catch (error) {
      throw Error(`Error occurred while updating customer: ${error}`);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await collections.customers?.deleteOne({ _id: new ObjectId(id)} );
      return;
    } catch (error) {
      throw Error(`Error occurred while deleting customer: ${error}`);
    }
  }
}
