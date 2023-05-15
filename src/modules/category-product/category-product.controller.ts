import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateCategoryProduct } from './use-cases/create-category-product';
import { GetCategoryProduct } from './use-cases/get-category-product';
import { FilterCategoryProduct } from './use-cases/filter-category-product';
import { SaveCategoryProduct } from './use-cases/save-category-product';
import { DeleteCategoryProduct } from './use-cases/delete-category-product';
import {
  CreateCategoryProductSwagger,
  DeleteCategoryProductSwagger,
  DisableCategoryProductSwagger,
  EnableCategoryProductSwagger,
  FilterCategoryProductSwagger,
  GetCategoryProductSwagger,
  UpdateCategoryProductSwagger,
} from './swagger/category-product.swagger';
import { FilterCategoryProductBody } from './dtos/filter-category-product-body';
import {
  CategoryProductViewModel,
  ICategoryProductView,
} from './view-models/category-product';
import { CreateCategoryProductBody } from './dtos/create-category-product-body';
import { SaveCategoryProductBody } from './dtos/save-category-product-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnableCategoryProduct } from './use-cases/enable-category-product';
import { DisableCategoryProduct } from './use-cases/disable-category-product';

@ApiTags('CategoryProduct')
@Controller('category-product')
export class CategoryProductController {
  constructor(
    private createCategoryProduct: CreateCategoryProduct,
    private getCategoryProduct: GetCategoryProduct,
    private filterCategoryProduct: FilterCategoryProduct,
    private saveCategoryProduct: SaveCategoryProduct,
    private deleteCategoryProduct: DeleteCategoryProduct,
    private enableCategoryProduct: EnableCategoryProduct,
    private disableCategoryProduct: DisableCategoryProduct,
  ) {}

  @Get()
  @ApiOperation(FilterCategoryProductSwagger)
  async categoryProducts(
    @Query() query: FilterCategoryProductBody,
  ): Promise<{ categoryProducts: ICategoryProductView[] } | null> {
    const { categoryProducts } = await this.filterCategoryProduct.execute(
      query,
    );

    if (!categoryProducts) {
      return null;
    }

    return {
      categoryProducts: categoryProducts?.map(CategoryProductViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetCategoryProductSwagger)
  async categoryProduct(
    @Param('id') id: string,
  ): Promise<{ categoryProduct: ICategoryProductView } | null> {
    const { categoryProduct } = await this.getCategoryProduct.execute({
      id,
    });

    if (!categoryProduct) {
      return null;
    }

    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation(CreateCategoryProductSwagger)
  @ApiBody({ type: CreateCategoryProductBody })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateCategoryProductBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ categoryProduct: ICategoryProductView }> {
    const { categoryProduct } = await this.createCategoryProduct.execute({
      ...body,
      image,
    });
    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveCategoryProductBody })
  @ApiOperation(UpdateCategoryProductSwagger)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveCategoryProductBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ categoryProduct: ICategoryProductView }> {
    const { categoryProduct } = await this.saveCategoryProduct.execute({
      ...body,
      image,
    });

    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }

  @Patch(':categoryProductId')
  @ApiOperation(DeleteCategoryProductSwagger)
  async delete(
    @Param('categoryProductId') categoryProductId: string,
  ): Promise<{ categoryProduct: ICategoryProductView }> {
    const { categoryProduct } = await this.deleteCategoryProduct.execute({
      categoryProductId,
    });

    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }
  @Patch('disable/:categoryProductId')
  @ApiOperation(DisableCategoryProductSwagger)
  async disable(
    @Param('categoryProductId') categoryProductId: string,
  ): Promise<{ categoryProduct: ICategoryProductView }> {
    const { categoryProduct } = await this.disableCategoryProduct.execute({
      categoryProductId,
    });

    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }

  @Patch('enable/:categoryProductId')
  @ApiOperation(EnableCategoryProductSwagger)
  async enable(
    @Param('categoryProductId') categoryProductId: string,
  ): Promise<{ categoryProduct: ICategoryProductView }> {
    const { categoryProduct } = await this.enableCategoryProduct.execute({
      categoryProductId,
    });

    return {
      categoryProduct: CategoryProductViewModel.toHTTP(categoryProduct),
    };
  }
}
