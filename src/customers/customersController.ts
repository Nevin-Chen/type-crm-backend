import { Controller, Get, Post, Patch, Delete, Path, Route, Res, TsoaResponse, Body } from "tsoa";
import { Customer, CustomerCreateParams, CustomerUpdateParams } from "./customer";
import { CustomersService  } from "./customersService";

@Route("customers")
export class CustomerController extends Controller {
	@Get("/")
	public async getAllCustomers(
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<Customer[]> {
		try {
			const customers = await new CustomersService().getAll();

			if (!customers) {
				return notFoundResponse(404, { reason: "Customers do not exist" });
			}

			return customers;
		} catch (error) {
			throw error;
		}
	}

	@Get("{customerId}")
	public async getCustomerById(
		@Path() customerId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<Customer> {
		try {
			const customer = await new CustomersService().get(customerId);

			if (!customer) {
				return notFoundResponse(404, { reason: "The customer _id does not exist" });
			}

			return customer;
		} catch (error) {
			throw error;
		}
	}

	@Post()
	public async createCustomer(
		@Body() requestBody: CustomerCreateParams
	): Promise<Customer> {
		try {
			const customer = await new CustomersService().create(requestBody);
			return customer;
		} catch (error) {
			throw error;
		}
	}

	@Patch("{customerId}")
	public async updateCustomer(
		@Path() customerId: string,
		@Body() updateParams: CustomerUpdateParams
	): Promise<boolean> {
		try {
			const customer = await new CustomersService().update(customerId, updateParams);
			return customer;
		} catch (error) {
			throw error;
		}
	}

	@Delete("{customerId}")
	public async deleteCustomer(
		@Path() customerId: string
	): Promise<void> {
		try {
			return await new CustomersService().delete(customerId);
		} catch (error) {
			throw error;
		}
	}
}
