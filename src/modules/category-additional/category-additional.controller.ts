import { Controller, Post, Body } from '@nestjs/common';
import { CreateCategoryAdditional } from './use-cases/create-category-additional';
import { CreateCategoryAdditionalBody } from './dtos/create-category-additional-body';
import { CategoryAdditionalViewModel } from './view-models/category-additional';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateCategoryAdditionalSwagger } from './swagger/category-additional.swagger';

@ApiTags('CategoryAdditional')
@Controller('category-additional')
export class CategoryAdditionalController {
  constructor(private createCategoryAdditional: CreateCategoryAdditional) {}

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
}
