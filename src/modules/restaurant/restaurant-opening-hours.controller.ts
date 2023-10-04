import { Body, Controller, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

import { AddOpeningHourBody } from './dtos/add-opening-hour.body';
import { SaveOpeningHourBody } from './dtos/save-opening-hour.body';
import { AddOpeningHour } from './use-cases/openingHours/add-opening-hour';
import { RemoveOpeningHour } from './use-cases/openingHours/remove-opening-hour';
import { SaveOpeningHour } from './use-cases/openingHours/save-opening-hour';
import { IRestaurantView, RestaurantViewModel } from './view-models/restaurant';

@UseGuards(AuthGuard)
@Controller('restaurant')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class RestaurantOpeningHoursController {
  constructor(
    private addOpeningHour: AddOpeningHour,
    private removeOpeningHour: RemoveOpeningHour,
    private saveOpeningHour: SaveOpeningHour
  ) { }

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

}
