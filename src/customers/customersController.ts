import { Controller, Get, Path, Query, Route } from "tsoa";
import { Customer } from './customer';
import { CustomersService } from "./customersService";

@Route('customers')
export class CustomerController extends Controller {
    @Get('/')
    public async getAllCustomers(): Promise<Customer[]> {
        return new CustomersService().getAll()
    }

    @Get('/:customerId')
    public async getCustomerById(
        @Path() customerId: number,
        @Query() name?: string,
        @Query() email?: string,
        @Query() address?: string,
        @Query() phoneNumber?: string
    ): Promise<Customer> {
        return new CustomersService().get(customerId, name, email, phoneNumber, address);
    }
}
