import { Test, TestingModule } from '@nestjs/testing';
import { MongoStudentService } from './mongo-student.service';

describe('MongoStudentService', () => {
  let service: MongoStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoStudentService],
    }).compile();

    service = module.get<MongoStudentService>(MongoStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
