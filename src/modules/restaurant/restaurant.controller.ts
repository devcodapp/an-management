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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

import { CreateRestaurantBody } from './dtos/create-restaurant.body';
import { FilterRestaurantBody } from './dtos/filter-restaurant.body';
import { SaveRestaurantBody } from './dtos/save-restaurant.body';
import { CloseRestaurant } from './use-cases/close-restaurant';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { SaveRestaurant } from './use-cases/save-restaurant';
import { IRestaurantView, RestaurantViewModel } from './view-models/restaurant';

@Controller('restaurant')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class RestaurantController {
  constructor(
    private createRestaurant: CreateRestaurant,
    private saveRestaurant: SaveRestaurant,
    private getRestaurant: GetRestaurant,
    private filterRestaurant: FilterRestaurant,
    private disableRestaurant: DisableRestaurant,
    private openRestaurant: OpenRestaurant,
    private closeRestaurant: CloseRestaurant,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async restaurants(
    @Query() query: FilterRestaurantBody,
  ): Promise<{ restaurants: IRestaurantView[] } | null> {
    const { restaurants } = await this.filterRestaurant.execute(query);

    if (!restaurants) {
      return null;
    }

    return { restaurants: restaurants?.map(RestaurantViewModel.toHTTP) };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async restaurant(
    @Param('id') id: string,
  ): Promise<{ restaurant: IRestaurantView } | null> {
    const { restaurant } = await this.getRestaurant.execute({ id });

    if (!restaurant) {
      return null;
    }

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @Post()
  async create(
    @Body() body: CreateRestaurantBody,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.createRestaurant.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() body: SaveRestaurantBody,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.saveRestaurant.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('open/:restaurantId')
  async open(@Param('restaurantId') restaurantId: string): Promise<void> {
    await this.openRestaurant.execute({
      restaurantId,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('close/:restaurantId')
  async close(@Param('restaurantId') restaurantId: string): Promise<void> {
    await this.closeRestaurant.execute({
      restaurantId,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('disable/:restaurantId')
  async disable(
    @Param('restaurantId') restaurantId: string,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.disableRestaurant.execute({
      restaurantId,
    });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }
}
