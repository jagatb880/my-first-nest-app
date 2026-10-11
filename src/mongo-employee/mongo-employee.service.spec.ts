import { Test, TestingModule } from '@nestjs/testing';
import { MongoEmployeeService } from './mongo-employee.service';

describe('MongoEmployeeService', () => {
  let service: MongoEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoEmployeeService],
    }).compile();

    service = module.get<MongoEmployeeService>(MongoEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
