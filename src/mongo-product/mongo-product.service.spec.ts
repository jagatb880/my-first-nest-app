import { Test, TestingModule } from '@nestjs/testing';
import { MongoProductService } from './mongo-product.service';

describe('MongoProductService', () => {
  let service: MongoProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoProductService],
    }).compile();

    service = module.get<MongoProductService>(MongoProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
