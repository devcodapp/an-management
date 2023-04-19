import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { CreateCategoryAdditional } from './use-cases/create-category-additional';
import { CreateCategoryAdditionalBody } from './dtos/create-category-additional-body';
import { CategoryAdditionalViewModel } from './view-models/category-additional';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  CreateCategoryAdditionalSwagger,
  DeleteCategoryAdditionalSwagger,
  FilterCategoryAdditionalSwagger,
  GetCategoryAdditionalSwagger,
  UpdateCategoryAdditionalSwagger,
} from './swagger/category-additional.swagger';
import { GetCategoryAdditional } from './use-cases/get-category-additional';
import { FilterCategoryAdditionalBody } from './dtos/filter-category-additional-body';
import { FilterCategoryAdditional } from './use-cases/filter-category-additional';
import { SaveCategoryAdditional } from './use-cases/save-category-additional';
import { DeleteCategoryAdditional } from './use-cases/delete-category-additional';
import { SaveCategoryAdditionalBody } from './dtos/save-category-additional-body';

@ApiTags('CategoryAdditional')
@Controller('category-additional')
export class CategoryAdditionalController {
  constructor(
    private createCategoryAdditional: CreateCategoryAdditional,
    private getCategoryAdditional: GetCategoryAdditional,
    private filterCategoryAdditional: FilterCategoryAdditional,
    private saveCategoryAdditional: SaveCategoryAdditional,
    private deleteCategoryAdditional: DeleteCategoryAdditional,
  ) {}

  @Get()
  @ApiOperation(FilterCategoryAdditionalSwagger)
  async categoryAdditionals(
    @Query() query: FilterCategoryAdditionalBody,
  ): Promise<any> {
    const { categoryAdditionals } = await this.filterCategoryAdditional.execute(
      query,
    );
    return {
      categoryAdditionals: categoryAdditionals?.map(
        CategoryAdditionalViewModel.toHTTP,
      ),
    };
  }

  @Get(':id')
  @ApiOperation(GetCategoryAdditionalSwagger)
  async categoryAdittional(@Param('id') id: string): Promise<any> {
    const { categoryAdditional } = await this.getCategoryAdditional.execute({
      id,
    });

    if (!categoryAdditional) {
      return {};
    }

    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }

  @Post()
  @ApiOperation(CreateCategoryAdditionalSwagger)
  @ApiBody({ type: CreateCategoryAdditionalBody })
  async create(@Body() body: CreateCategoryAdditionalBody): Promise<any> {
    const { categoryAdditional } = await this.createCategoryAdditional.execute(
      body,
    );
    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }

  @Put()
  @ApiBody({ type: SaveCategoryAdditionalBody })
  @ApiOperation(UpdateCategoryAdditionalSwagger)
  async update(@Body() body: SaveCategoryAdditionalBody) {
    const { categoryAdditional } = await this.saveCategoryAdditional.execute(
      body,
    );

    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }

  @Patch(':categoryAdditionalId')
  @ApiOperation(DeleteCategoryAdditionalSwagger)
  async delete(@Param('categoryAdditionalId') categoryAdditionalId: string) {
    const { categoryAdditional } = await this.deleteCategoryAdditional.execute({
      categoryAdditionalId,
    });

    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }
}
