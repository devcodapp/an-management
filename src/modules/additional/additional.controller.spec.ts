import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalController } from './additional.controller';

describe('AdditionalController', () => {
  let controller: AdditionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalController],
    }).compile();

    controller = module.get<AdditionalController>(AdditionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
