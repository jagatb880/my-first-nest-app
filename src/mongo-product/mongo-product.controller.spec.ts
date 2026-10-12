import { Test, TestingModule } from '@nestjs/testing';
import { MongoProductController } from './mongo-product.controller';

describe('MongoProductController', () => {
  let controller: MongoProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoProductController],
    }).compile();

    controller = module.get<MongoProductController>(MongoProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
