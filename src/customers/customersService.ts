import { Customer } from "./customer";

export class CustomersService {
  public getAll() {
    return [];
  }

  public get(id: number, name?: string, email?: string , phoneNumber?: string, address?: string): Customer {
    return {
      id,
      email: email ?? "max@power.com",
      name: name ?? "Max Power",
      phoneNumber: phoneNumber ?? "555-555-5555",
      address: address ?? '123 Fake Street'
    };
  }
}
