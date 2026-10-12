import { Test, TestingModule } from '@nestjs/testing';
import { MongoProjectService } from './mongo-project.service';

describe('MongoProjectService', () => {
  let service: MongoProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoProjectService],
    }).compile();

    service = module.get<MongoProjectService>(MongoProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
