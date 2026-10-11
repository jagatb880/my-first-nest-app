import { Injectable } from '@nestjs/common';
import { ICustomer } from './Interfaces/customer.interface';
import { CreateCustomerDto } from './DTO/create-customer.dto';

@Injectable()
export class CustomerService {
  private customers: ICustomer[] = [];

  getAllCustomers(): ICustomer[] {
    return this.customers;
  }

  addCustomer(createCustomerDTO: CreateCustomerDto): ICustomer {
    const newCustomer: ICustomer = {
      id: Date.now(), // Using timestamp as a simple unique ID
      ...createCustomerDTO,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
}
