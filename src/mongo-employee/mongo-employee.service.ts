import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schema/profile.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class MongoEmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    const profile = await this.profileModel.create(employeeData.profile);
    const employee = await this.employeeModel.create({
      name: employeeData.name,
      profile: profile._id,
    });
    return employee.populate('Profile');
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().populate('profile').exec();
  }
}
