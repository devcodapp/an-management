import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantOptionController } from './product-variant-option.controller';

describe('ProductVariantOptionController', () => {
  let controller: ProductVariantOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantOptionController],
    }).compile();

    controller = module.get<ProductVariantOptionController>(ProductVariantOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
