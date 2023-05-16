import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProduct } from './use-cases/create-product';
import {
  CreateProductSwagger,
  DeleteProductSwagger,
  DisableProductSwagger,
  EnableProductSwagger,
  GetProductSwagger,
  UpdateProductSwagger,
} from './swagger/product.swagger';
import { CreateProductBody } from './dtos/create-product-body';
import { IProductView, ProductViewModel } from './view-models/product';
import { SaveProduct } from './use-cases/save-product';
import { DeleteProduct } from './use-cases/delete-product';
import { DisableProduct } from './use-cases/disable-product';
import { EnableProduct } from './use-cases/enable-product';
import { GetProduct } from './use-cases/get-product';
import { FilterProduct } from './use-cases/filter-product';
import { FilterProductBody } from './dtos/filter-product-body';
import { SaveProductBody } from './dtos/save-product-body';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class ProductController {
  constructor(
    private createProduct: CreateProduct,
    private saveProduct: SaveProduct,
    private deleteProduct: DeleteProduct,
    private disableProduct: DisableProduct,
    private enableProduct: EnableProduct,
    private getProduct: GetProduct,
    private filterProduct: FilterProduct,
  ) {}

  @Get()
  @ApiOperation(GetProductSwagger)
  async products(
    @Query() query: FilterProductBody,
  ): Promise<{ products: IProductView[] } | null> {
    const { products } = await this.filterProduct.execute(query);

    if (!products) {
      return null;
    }

    return {
      products: products.map(ProductViewModel.toHTTP),
    };
  }
  @Get(':id')
  @ApiOperation(GetProductSwagger)
  async product(
    @Param('id') id: string,
  ): Promise<{ product: IProductView } | null> {
    const { product } = await this.getProduct.execute({ productId: id });

    if (!product) {
      return null;
    }

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

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

  @Put()
  @ApiBody({ type: SaveProductBody })
  @ApiOperation(UpdateProductSwagger)
  async update(
    @Body() body: SaveProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.saveProduct.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch(':productId')
  @ApiOperation(DeleteProductSwagger)
  async delete(
    @Param('productId') productId: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.deleteProduct.execute({
      productId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('disable/:productId')
  @ApiOperation(DisableProductSwagger)
  async disable(
    @Param('productId') productId: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.disableProduct.execute({
      productId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('enable/:productId')
  @ApiOperation(EnableProductSwagger)
  async enable(
    @Param('productId') productId: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.enableProduct.execute({
      productId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }
}
