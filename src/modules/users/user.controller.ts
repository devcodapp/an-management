import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Put,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateUserBody } from './dtos/create-user-body';
import { FilterUserBody } from './dtos/filter-user-body';
import { SaveUserBody } from './dtos/save-user-body';
import {
  FilterUserSwagger,
  GetUserSwagger,
  CreateUserSwagger,
  UpdateUserSwagger,
  DeleteUserSwagger,
} from './swagger/user.swagger';
import { CreateUser } from './use-cases/create-user';
import { DeleteUser } from './use-cases/delete-user';
import { FilterUser } from './use-cases/filter-user';
import { GetUser } from './use-cases/get-user';
import { SaveUser } from './use-cases/save-user';
import { IUserView, UserViewModel } from './view-models/user';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUser: GetUser,
    private filterUser: FilterUser,
    private saveUser: SaveUser,
    private deleteUser: DeleteUser,
  ) {}

  @Get()
  @ApiOperation(FilterUserSwagger)
  async user(
    @Query() query: FilterUserBody,
  ): Promise<{ user: IUserView[] } | null> {
    const { users } = await this.filterUser.execute(query);

    if (!users) {
      return null;
    }

    return {
      user: users?.map(UserViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetUserSwagger)
  async categoryAdittional(
    @Param('id') id: string,
  ): Promise<{ user: IUserView } | null> {
    const { user } = await this.getUser.execute({
      id,
    });

    if (!user) {
      return null;
    }

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation(CreateUserSwagger)
  @ApiBody({ type: CreateUserBody })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateUserBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ user: IUserView }> {
    const { user } = await this.createUser.execute({
      ...body,
      image,
    });
    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveUserBody })
  @ApiOperation(UpdateUserSwagger)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveUserBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ user: IUserView }> {
    const { user } = await this.saveUser.execute({
      ...body,
      image,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Patch(':userId')
  @ApiOperation(DeleteUserSwagger)
  async delete(@Param('userId') userId: string): Promise<{ user: IUserView }> {
    const { user } = await this.deleteUser.execute({
      userId,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
