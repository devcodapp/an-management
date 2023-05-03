import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProduct } from './use-cases/create-product';
import { CreateProductSwagger } from './swagger/product.swagger';
import { CreateProductBody } from './dtos/create-product-body';
import { IProductView, ProductViewModel } from './view-models/product';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private createProduct: CreateProduct) {}
  @Post()
  @ApiOperation(CreateProductSwagger)
  @ApiBody({ type: CreateProductBody })
  async create(
    @Body() body: CreateProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.createProduct.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }
}
