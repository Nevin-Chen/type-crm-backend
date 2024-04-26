import { Controller, Get, Path, Route, Res, TsoaResponse } from "tsoa";
import { Customer } from "./customer";
import { CustomersService } from "./customersService";

@Route("customers")
export class CustomerController extends Controller {
	@Get("/")
	public async getAllCustomers(
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<Customer[] > {
		const customers = await new CustomersService().getAll();
		if (!customers) return notFoundResponse(404, { reason: "The customer _id does not exist" });
		return customers;
	}

	@Get("{customerId}")
	public async getCustomerById(
		@Path() customerId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<Customer> {
		const customer = await new CustomersService().get(customerId);
		if (!customer) return notFoundResponse(404, { reason: "The customer _id does not exist" });
		return customer;
	}
}
