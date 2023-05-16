import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryAdditional } from './use-cases/create-category-additional';
import { CreateCategoryAdditionalBody } from './dtos/create-category-additional-body';
import {
  CategoryAdditionalViewModel,
  ICategoryAdditionalView,
} from './view-models/category-additional';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  ): Promise<{ categoryAdditionals: ICategoryAdditionalView[] } | null> {
    const { categoryAdditionals } = await this.filterCategoryAdditional.execute(
      query,
    );

    if (!categoryAdditionals) {
      return null;
    }

    return {
      categoryAdditionals: categoryAdditionals?.map(
        CategoryAdditionalViewModel.toHTTP,
      ),
    };
  }

  @Get(':id')
  @ApiOperation(GetCategoryAdditionalSwagger)
  async categoryAdittional(
    @Param('id') id: string,
  ): Promise<{ categoryAdditional: ICategoryAdditionalView } | null> {
    const { categoryAdditional } = await this.getCategoryAdditional.execute({
      id,
    });

    if (!categoryAdditional) {
      return null;
    }

    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }

  @Post()
  @ApiOperation(CreateCategoryAdditionalSwagger)
  @ApiBody({ type: CreateCategoryAdditionalBody })
  async create(
    @Body() body: CreateCategoryAdditionalBody,
  ): Promise<{ categoryAdditional: ICategoryAdditionalView }> {
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
  async update(
    @Body() body: SaveCategoryAdditionalBody,
  ): Promise<{ categoryAdditional: ICategoryAdditionalView }> {
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
  async delete(
    @Param('categoryAdditionalId') categoryAdditionalId: string,
  ): Promise<{ categoryAdditional: ICategoryAdditionalView }> {
    const { categoryAdditional } = await this.deleteCategoryAdditional.execute({
      categoryAdditionalId,
    });

    return {
      categoryAdditional:
        CategoryAdditionalViewModel.toHTTP(categoryAdditional),
    };
  }
}
