import { Test, TestingModule } from '@nestjs/testing';
import { MongoStudentController } from './mongo-student.controller';

describe('MongoStudentController', () => {
  let controller: MongoStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoStudentController],
    }).compile();

    controller = module.get<MongoStudentController>(MongoStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
