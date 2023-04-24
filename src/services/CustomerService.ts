import { Customer } from "../models/Customer";

export class CustomerService {
  static async createCustomer(data: any): Promise<Customer> {
    const customer = await Customer.create(data);
    return customer;
  }

  static async getCustomerById(id: number): Promise<Customer | null> {
    const customer = await Customer.findByPk(id);
    return customer;
  }

  static async getCustomers(): Promise<Customer[]> {
    const customers = await Customer.findAll();
    return customers;
  }

  static async updateCustomerById(id: number, data: any): Promise<number> {
    const result = await Customer.update(data, {
      where: {
        id,
      },
    });
    return result[0];
  }

  static async deleteCustomerById(id: number): Promise<number> {
    const result = await Customer.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}
