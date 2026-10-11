import { Module } from '@nestjs/common';
import { MongoEmployeeService } from './mongo-employee.service';
import { MongoEmployeeController } from './mongo-employee.controller';
import { Employee, EmployeeSchema } from './schema/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [MongoEmployeeService],
  controllers: [MongoEmployeeController],
})
export class MongoEmployeeModule {}
