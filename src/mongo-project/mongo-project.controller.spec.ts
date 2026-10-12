import { Test, TestingModule } from '@nestjs/testing';
import { MongoProjectController } from './mongo-project.controller';

describe('MongoProjectController', () => {
  let controller: MongoProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoProjectController],
    }).compile();

    controller = module.get<MongoProjectController>(MongoProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
