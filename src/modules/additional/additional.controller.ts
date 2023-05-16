import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
import { AdditionalViewModel, IAdditionalView } from './view-models/additional';
import { CreateAdditionalBody } from './dtos/create-additional-body';
import { SaveAdditionalBody } from './dtos/save-additional-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Additional')
@Controller('additional')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
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
  @UseInterceptors(BooleanInterceptor, ArrayInterceptor)
  async additionals(
    @Query() query: FilterAdditionalBody,
  ): Promise<{ additionals: IAdditionalView[] } | null> {
    const { additionals } = await this.filterAdditional.execute(query);

    if (!additionals) {
      return null;
    }

    return {
      additionals: additionals?.map(AdditionalViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetAdditionalSwagger)
  async adittional(
    @Param('id') id: string,
  ): Promise<{ additional: IAdditionalView } | null> {
    const { additional } = await this.getAdditional.execute({
      id,
    });

    if (!additional) {
      return null;
    }

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation(CreateAdditionalSwagger)
  @ApiBody({ type: CreateAdditionalBody })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateAdditionalBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ additional: IAdditionalView }> {
    const { additional } = await this.createAdditional.execute({
      ...body,
      image,
    });

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveAdditionalBody })
  @ApiOperation(UpdateAdditionalSwagger)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveAdditionalBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ additional: IAdditionalView }> {
    const { additional } = await this.saveAdditional.execute({
      ...body,
      image,
    });

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }

  @Patch(':additionalId')
  @ApiOperation(DeleteAdditionalSwagger)
  async delete(
    @Param('additionalId') additionalId: string,
  ): Promise<{ additional: IAdditionalView }> {
    const { additional } = await this.deleteAdditional.execute({
      additionalId,
    });

    return {
      additional: AdditionalViewModel.toHTTP(additional),
    };
  }
}
