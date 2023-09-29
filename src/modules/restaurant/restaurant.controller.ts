import { Body, Controller, Get, Param, Patch, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

import { AddOpeningHourBody } from './dtos/add-opening-hour.body';
import { CreateRestaurantBody } from './dtos/create-restaurant.body';
import { FilterRestaurantBody } from './dtos/filter-restaurant.body';
import { SaveOpeningHourBody } from './dtos/save-opening-hour.body';
import { SaveRestaurantBody } from './dtos/save-restaurant.body';
import { AddOpeningHour } from './use-cases/add-opening-hour';
import { CloseRestaurant } from './use-cases/close-restaurant';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { GetSlugRestaurant } from './use-cases/get-slug-restaurant';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { RemoveOpeningHour } from './use-cases/remove-opening-hour';
import { SaveOpeningHour } from './use-cases/save-opening-hour';
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
    private getSlugRestaurant: GetSlugRestaurant,
    private addOpeningHour: AddOpeningHour,
    private removeOpeningHour: RemoveOpeningHour,
    private saveOpeningHour: SaveOpeningHour
  ) { }

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

  @UseGuards(AuthGuard)
  @Get('/slug/:slug')
  async restaurantSlug(
    @Param('slug') slug: string,
  ): Promise<{ restaurant: IRestaurantView } | null> {
    const { restaurant } = await this.getSlugRestaurant.execute({ slug });

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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]))
  async update(
    @Body() body: SaveRestaurantBody,
    @UploadedFiles() files: { image?: Express.Multer.File[], banner?: Express.Multer.File[] },
  ): Promise<{ restaurant: IRestaurantView }> {
    const image = files?.image ? files.image[0] : undefined
    const banner = files?.banner ? files.banner[0] : undefined
    const { restaurant } = await this.saveRestaurant.execute({ ...body, image, banner });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/opening-hour/save')
  async updateOpenHour(@Body() body: SaveOpeningHourBody): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.saveOpeningHour.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/:restaurantId/opening-hour/:openingHourId/remove')
  async removeOpenHour(@Param('restaurantId') restaurantId: string, @Param('openingHourId') openingHourId: string): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.removeOpeningHour.execute({ openingHourId, restaurantId });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('opening-hour')
  async addOpenHour(@Body() body: AddOpeningHourBody): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.addOpeningHour.execute(body);

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
