import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddVariantProduct } from './use-cases/add-variant-product';
import { RemoveVariantProduct } from './use-cases/remove-variant-product';
import { SaveVariantProduct } from './use-cases/save-variant-product';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  IProductView,
  ProductViewModel,
} from '@modules/product/view-models/product';
import {
  CreateProductVariantSwagger,
  DeleteProductVariantSwagger,
  UpdateProductVariantSwagger,
} from './swagger/variant-product.swagger';
import { CreateVariantProductBody } from './dtos/create-variant-product-body';
import { SaveVariantProductBody } from './dtos/save-variant-product-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Product Variation')
@Controller('product-variant')
export class ProductVariantController {
  constructor(
    private addVariantProduct: AddVariantProduct,
    private removeVariantProduct: RemoveVariantProduct,
    private saveVariantProduct: SaveVariantProduct,
  ) {}

  @Post()
  @ApiOperation(CreateProductVariantSwagger)
  @ApiBody({ type: CreateVariantProductBody })
  async create(
    @Body() body: CreateVariantProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.addVariantProduct.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Put()
  @ApiOperation(UpdateProductVariantSwagger)
  @ApiBody({ type: SaveVariantProductBody })
  async update(
    @Body() body: SaveVariantProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.saveVariantProduct.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Delete('p/:productId/v/:variantId')
  @ApiOperation(DeleteProductVariantSwagger)
  async delete(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.removeVariantProduct.execute({
      productId,
      variantId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }
}
