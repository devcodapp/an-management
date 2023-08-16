import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSubOption } from './use-cases/create-suboption';
import { SaveSubOption } from './use-cases/save-suboption';
import { DeleteSubOption } from './use-cases/delete-suboption';
import { DisableSubOption } from './use-cases/disable-suboption';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateSubOptionSwagger,
  DeleteSubOptionSwagger,
  DisableSubOptionSwagger,
  EnableSubOptionSwagger,
  UpdateSubOptionSwagger,
} from './swagger/suboption.swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSubOptionBody } from './dtos/create-suboption-body';
import {
  IOptionView,
  OptionViewModel,
} from '@modules/option/view-models/option';
import { SaveSubOptionBody } from './dtos/save-suboption-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { EnableSubOption } from './use-cases/enable-suboption';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('SubOption')
@Controller('suboption')
export class SuboptionController {
  constructor(
    private createSubOption: CreateSubOption,
    private saveSubOption: SaveSubOption,
    private deleteSubOption: DeleteSubOption,
    private disableSubOption: DisableSubOption,
    private enableSubOption: EnableSubOption,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation(CreateSubOptionSwagger)
  @ApiBody({ type: CreateSubOptionBody })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateSubOptionBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.createSubOption.execute({
      ...body,
      image,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }
  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiOperation(UpdateSubOptionSwagger)
  @ApiBody({ type: SaveSubOptionBody })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveSubOptionBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.saveSubOption.execute({
      ...body,
      image,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }

  @Delete('option/:optionId/:name')
  @ApiOperation(DeleteSubOptionSwagger)
  async delete(
    @Param('optionId') optionId: string,
    @Param('name') name: string,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.deleteSubOption.execute({
      optionId,
      subOptionName: name,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }

  @Patch('option/:optionId/:name/disable')
  @ApiOperation(DisableSubOptionSwagger)
  async disable(
    @Param('optionId') optionId: string,
    @Param('name') name: string,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.disableSubOption.execute({
      optionId,
      subOptionName: name,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }
  @Patch('option/:optionId/:name/enable')
  @ApiOperation(EnableSubOptionSwagger)
  async enable(
    @Param('optionId') optionId: string,
    @Param('name') name: string,
  ): Promise<{ option: IOptionView }> {
    const { option } = await this.enableSubOption.execute({
      optionId,
      subOptionName: name,
    });

    return {
      option: OptionViewModel.toHTTP(option),
    };
  }
}
