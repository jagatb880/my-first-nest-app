import { Body, Controller, Get, Post } from '@nestjs/common';
import { MongoEmployeeService } from './mongo-employee.service';
import { Employee } from './schema/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('mongo-employee')
export class MongoEmployeeController {
  constructor(private readonly employeeService: MongoEmployeeService) {}

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
