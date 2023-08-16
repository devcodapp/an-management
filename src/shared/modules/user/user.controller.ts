import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUserSwagger, UpdateUserSwagger } from './swagger/user.swagger';
import { CreateUser } from './use-cases/create-user';
import { IUserView, UserViewModel } from './view-models/user';
import { SaveUser } from './use-cases/save-user';
import { UpdateUserBody } from './dtos/update-user-body';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private createUser: CreateUser, private saveUser: SaveUser) {}

  @Post()
  @ApiOperation(CreateUserSwagger)
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateUserBody })
  async create(@Body() body: CreateUserBody): Promise<{ user: IUserView }> {
    const { user } = await this.createUser.execute(body);

    return { user: UserViewModel.toHTTP(user) };
  }

  @Put()
  @ApiOperation(UpdateUserSwagger)
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateUserBody })
  async update(@Body() body: UpdateUserBody): Promise<{ user: IUserView }> {
    const { user } = await this.saveUser.execute(body);

    return { user: UserViewModel.toHTTP(user) };
  }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // @Get(':id')
  // @ApiOperation(GetRestaurantSwagger)
  // async restaurant(
  //   @Param('id') id: string,
  // ): Promise<{ restaurant: IRestaurantView } | null> {
  //   const { restaurant } = await this.getRestaurant.execute({ id });

  //   if (!restaurant) {
  //     return null;
  //   }

  //   return {
  //     restaurant: RestaurantViewModel.toHTTP(restaurant),
  //   };
  // }
}
