import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

import { CreateRestaurantTypeBody } from './dtos/create-restaurant-type.body';
import { CreateRestaurantType } from './use-cases/create-restaurant-type';
import { DeleteRestaurantType } from './use-cases/delete-restaurant-type';
import { FilterRestaurantType } from './use-cases/filter-restaurant';
import {
  IRestaurantTypeView,
  RestaurantTypeViewModel,
} from './view-models/restaurant-type';

@Controller('restaurant-type')
export class RestaurantTypeController {
  constructor(
    private filterRestaurantType: FilterRestaurantType,
    private createRestaurantType: CreateRestaurantType,
    private deleteRestaurantType: DeleteRestaurantType,
  ) { }

  @Get()
  async restaurants(): Promise<{
    restaurantTypes: IRestaurantTypeView[];
  } | null> {
    const { restaurantTypes } = await this.filterRestaurantType.execute();

    if (!restaurantTypes) {
      return null;
    }

    return {
      restaurantTypes: restaurantTypes?.map(RestaurantTypeViewModel.toHTTP),
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() body: CreateRestaurantTypeBody,
  ): Promise<{ restaurantType: IRestaurantTypeView }> {
    const { restaurantType } = await this.createRestaurantType.execute(body);

    return {
      restaurantType: RestaurantTypeViewModel.toHTTP(restaurantType),
    };
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:restaurantTypeId')
  async delete(
    @Param('restaurantTypeId') restaurantTypeId: string,
  ): Promise<void> {
    await this.deleteRestaurantType.execute({
      restaurantTypeId,
    });

  }
}
