import { Test, TestingModule } from '@nestjs/testing';
import { MongoLibraryController } from './mongo-library.controller';

describe('MongoLibraryController', () => {
  let controller: MongoLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoLibraryController],
    }).compile();

    controller = module.get<MongoLibraryController>(MongoLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
