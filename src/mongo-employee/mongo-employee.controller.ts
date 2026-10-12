import { Body, Controller, Get, Post } from '@nestjs/common';
import { MongoEmployeeService } from './mongo-employee.service';
import { Employee } from './schema/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('mongo-employee')
export class MongoEmployeeController {
  constructor(private readonly employeeService: MongoEmployeeService) {}

  //   {
  //     "title":"Suresh Panda",
  //     "profile": {
  //         "age":24,
  //         "qualification":"BCA"
  //     }
  //  }
  @Post()
  async createEmployee(
    @Body() employeeData: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(employeeData);
  }

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }
}
