import {
  FilterOptionSwagger,
  GetOptionSwagger,
  CreateOptionSwagger,
  UpdateOptionSwagger,
  DeleteOptionSwagger,
} from '@modules/option/swagger/option.swagger';
import {
  IOptionView,
  OptionViewModel,
} from '@modules/option/view-models/option';
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
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FilterOptions } from './use-cases/filter-option';
import { GetOption } from './use-cases/get-option';
import { CreateOption } from './use-cases/create-option';
import { SaveOption } from './use-cases/save-option';
import { DeleteOption } from './use-cases/delete-option';
import { SaveOptionBody } from './dtos/save-option-body';
import { CreateOptionBody } from './dtos/create-option-body';
import { FilterOptionBody } from './dtos/filter-option-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Option')
@Controller('option')
export class OptionController {
  constructor(
    private filterOptions: FilterOptions,
    private getOption: GetOption,
    private createOption: CreateOption,
    private saveOption: SaveOption,
    private deleteOption: DeleteOption,
  ) {}

  @Get()
  @ApiOperation(FilterOptionSwagger)
  async options(
    @Query() query: FilterOptionBody,
  ): Promise<{ options: IOptionView[] } | null> {
    const { options } = await this.filterOptions.execute(query);

    if (!options) {
      return null;
    }

    return {
      options: options?.map(OptionViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetOptionSwagger)
  async adittional(
    @Param('id') id: string,
  ): Promise<{ option: IOptionView } | null> {
    const { option } = await this.getOption.execute({
      id,
    });

    if (!option) {
      return null;
    }

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }

  @Post()
  @ApiOperation(CreateOptionSwagger)
  @ApiBody({ type: CreateOptionBody })
  async create(
    @Body() body: CreateOptionBody,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.createOption.execute(body);

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }

  @Put()
  @ApiBody({ type: SaveOptionBody })
  @ApiOperation(UpdateOptionSwagger)
  async update(@Body() body: SaveOptionBody): Promise<{ option: IOptionView }> {
    const { option } = await this.saveOption.execute(body);

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }

  @Patch(':optionId')
  @ApiOperation(DeleteOptionSwagger)
  async delete(
    @Param('optionId') optionId: string,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.deleteOption.execute({
      optionId,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }
}
