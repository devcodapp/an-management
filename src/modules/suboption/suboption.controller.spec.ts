import { Test, TestingModule } from '@nestjs/testing';
import { SuboptionController } from './suboption.controller';

describe('SuboptionController', () => {
  let controller: SuboptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuboptionController],
    }).compile();

    controller = module.get<SuboptionController>(SuboptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
