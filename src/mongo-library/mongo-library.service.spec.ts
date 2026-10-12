import { Test, TestingModule } from '@nestjs/testing';
import { MongoLibraryService } from './mongo-library.service';

describe('MongoLibraryService', () => {
  let service: MongoLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoLibraryService],
    }).compile();

    service = module.get<MongoLibraryService>(MongoLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
