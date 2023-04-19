import { Controller, Post, Body } from '@nestjs/common';
import { CreateCategoryAdditional } from './use-cases/create-category-additional';
import { CreateCategoryAdditionalBody } from './dtos/create-category-additional-body';
import { CategoryAdditionalViewModel } from './view-models/category-additional';

@Controller('category-additional')
export class CategoryAdditionalController {
  constructor(private createCategoryAdditional: CreateCategoryAdditional) {}

  @Post()
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
