import { Body, Controller, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

import { AddDeliveryFeeBody } from './dtos/add-delivery-fee.body';
import { SaveDeliveryFeeBody } from './dtos/save-delivery-fee.body';
import { AddDeliveryFee } from './use-cases/deliveryFees/add-delivery-fee';
import { DisableDeliveryFee } from './use-cases/deliveryFees/disable-delivery-fee';
import { EnableDeliveryFee } from './use-cases/deliveryFees/enable-delivery-fee';
import { RemoveDeliveryFee } from './use-cases/deliveryFees/remove-delivery-fee';
import { SaveDeliveryFee } from './use-cases/deliveryFees/save-delivery-fee';
import { IRestaurantView, RestaurantViewModel } from './view-models/restaurant';

@UseGuards(AuthGuard)
@Controller('restaurant')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class RestaurantDeliveryFeesController {
  constructor(
    private addDeliveryFee: AddDeliveryFee,
    private removeDeliveryFee: RemoveDeliveryFee,
    private saveDeliveryFee: SaveDeliveryFee,
    private disableDeliveryFee: DisableDeliveryFee,
    private enableDeliveryFee: EnableDeliveryFee
  ) { }

  @UseGuards(AuthGuard)
  @Patch('/delivery-fee/save')
  async updateDeliveryFee(@Body() body: SaveDeliveryFeeBody): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.saveDeliveryFee.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/:restaurantId/delivery-fee/:deliveryFeeId/remove')
  async removeDelFee(@Param('restaurantId') restaurantId: string, @Param('deliveryFeeId') deliveryFeeId: string): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.removeDeliveryFee.execute({ deliveryFeeId, restaurantId });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/:restaurantId/delivery-fee/:deliveryFeeId/disable')
  async disableDelFee(@Param('restaurantId') restaurantId: string, @Param('deliveryFeeId') deliveryFeeId: string): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.disableDeliveryFee.execute({ deliveryFeeId, restaurantId });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/:restaurantId/delivery-fee/:deliveryFeeId/enabl')
  async enableDelFee(@Param('restaurantId') restaurantId: string, @Param('deliveryFeeId') deliveryFeeId: string): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.enableDeliveryFee.execute({ deliveryFeeId, restaurantId });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('delivery-fee')
  async addDelFee(@Body() body: AddDeliveryFeeBody): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.addDeliveryFee.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

}
