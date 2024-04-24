import { ObjectId } from "mongodb";
import { Customer } from "./customer";
import { collections } from "../services/mongodbService";

export class CustomersService {
  public getAll() {
    return [];
  }

  public async get(id: string): Promise<Customer | null> {
    try {
      const customer = await collections.customers?.findOne({ _id: new ObjectId(id) });

      if (customer) {
        // Map the retrieved data to your Customer interface
        return {
          _id: new ObjectId(customer._id.toString()),
          name: customer.name,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address
        };
      } else {
        return null; // Return null if no customer found
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error; // Throw the error to be handled by the caller
    }
  }
}
