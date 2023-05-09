import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantController } from './product-variant.controller';

describe('ProductVariantController', () => {
  let controller: ProductVariantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantController],
    }).compile();

    controller = module.get<ProductVariantController>(ProductVariantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
