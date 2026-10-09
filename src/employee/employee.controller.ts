import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
  @Get() // Decorator
  getUser(): string {
    return 'Employee data fetched successfully.';
  }
}
