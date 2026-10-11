import { Test, TestingModule } from '@nestjs/testing';
import { MongoUserController } from './mongo-user.controller';

describe('MongoUserController', () => {
  let controller: MongoUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoUserController],
    }).compile();

    controller = module.get<MongoUserController>(MongoUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
