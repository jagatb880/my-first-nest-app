import { Test, TestingModule } from '@nestjs/testing';
import { MongoEmployeeController } from './mongo-employee.controller';

describe('MongoEmployeeController', () => {
  let controller: MongoEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoEmployeeController],
    }).compile();

    controller = module.get<MongoEmployeeController>(MongoEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
