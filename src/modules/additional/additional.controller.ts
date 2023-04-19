import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdditional } from './use-cases/create-additional';
import { SaveAdditional } from './use-cases/save-additional';
import { GetAdditional } from './use-cases/get-additional';
import {
  CreateAdditionalSwagger,
  DeleteAdditionalSwagger,
  FilterAdditionalSwagger,
  GetAdditionalSwagger,
  UpdateAdditionalSwagger,
} from './swagger/additional.swagger';
import { FilterAdditionalBody } from './dtos/filter-additional-body';
import { DeleteAdditional } from './use-cases/delete-additional';
import { FilterAdditional } from './use-cases/filter-additional';
import { AdditionalViewModel } from './view-models/additional';
import { CreateAdditionalBody } from './dtos/create-additional-body';
import { SaveAdditionalBody } from './dtos/save-additional-body';

@ApiTags('Additional')
@Controller('additional')
export class AdditionalController {
  constructor(
    private createAdditional: CreateAdditional,
    private saveAdditional: SaveAdditional,
    private getAdditional: GetAdditional,
    private filterAdditional: FilterAdditional,
    private deleteAdditional: DeleteAdditional,
  ) {}

  @Get()
  @ApiOperation(FilterAdditionalSwagger)
  async additionals(@Query() query: FilterAdditionalBody): Promise<any> {
    const { additionals } = await this.filterAdditional.execute(query);

    return {
      additionals: additionals?.map(AdditionalViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetAdditionalSwagger)
  async adittional(@Param('id') id: string): Promise<any> {
    const { additional } = await this.getAdditional.execute({
      id,
    });

    if (!additional) {
      return {};
    }

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Post()
  @ApiOperation(CreateAdditionalSwagger)
  @ApiBody({ type: CreateAdditionalBody })
  async create(@Body() body: CreateAdditionalBody): Promise<any> {
    const { additional } = await this.createAdditional.execute(body);

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Put()
  @ApiBody({ type: SaveAdditionalBody })
  @ApiOperation(UpdateAdditionalSwagger)
  async update(@Body() body: SaveAdditionalBody) {
    const { additional } = await this.saveAdditional.execute(body);

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Patch(':additionalId')
  @ApiOperation(DeleteAdditionalSwagger)
  async delete(@Param('additionalId') additionalId: string) {
    const { additional } = await this.deleteAdditional.execute({
      additionalId,
    });

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }
}
