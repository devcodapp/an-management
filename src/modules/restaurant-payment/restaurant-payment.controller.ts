import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRestaurantPayment } from './use-cases/create-restaurant-payment';
import { RestaurantPaymentCreateBody } from './dtos/restaurant-payment-create.body';
import { IRestaurantPaymentView, RestaurantPaymentViewModel } from './view-models/restaurantPayment';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { SaveRestaurantPaymentBody } from './dtos/save-restaurant-payment.body';
import { SaveRestaurantPayment } from './use-cases/save-restaurant-payment';
import { DeleteRestaurantPayment } from './use-cases/delete-restaurant-payment';
import { GetRestaurantPayment } from './use-cases/get-restaurant-payment';
import { FilterRestaurantPaymentBody } from './dtos/filter-restaurant-payment.body';
import { FilterRestaurantPayment } from './use-cases/filter-restaurant-payment';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

@UseGuards(AuthGuard)
@Controller('restaurant-payment')
export class RestaurantPaymentController {

    constructor(
        private createRestaurantPayment: CreateRestaurantPayment,
        private saveRestaurantPayment: SaveRestaurantPayment,
        private getRestaurantPayment: GetRestaurantPayment,
        private deleteRestaurantPayment: DeleteRestaurantPayment,
        private filterRestaurantPayment: FilterRestaurantPayment
    ) {}

    @Get()
    async coupons(
      @Query() query: FilterRestaurantPaymentBody,
    ): Promise<{ restaurantPayments: IRestaurantPaymentView[] } | null> {
      const { restaurantPayments } = await this.filterRestaurantPayment.execute(query)
  
      if (!restaurantPayments) {
        return null
      }
  
      return {
        restaurantPayments: restaurantPayments.map(RestaurantPaymentViewModel.toHTTP),
      }
    }
  

    @Get(':id')
    async coupon(
      @Param('id') restaurantPaymentId: string,
    ): Promise<{ restaurantPayment: IRestaurantPaymentView } | null> {
      const { restaurantPayment } = await this.getRestaurantPayment.execute({
        restaurantPaymentId,
      })
  
      if (!restaurantPayment) {
        return null
      }
  
      return {
        restaurantPayment: RestaurantPaymentViewModel.toHTTP(restaurantPayment),
      }
    }

    @Post()
    async create(
        @Body() body: RestaurantPaymentCreateBody
    ) : Promise<{restaurantPayment: IRestaurantPaymentView}> {
        const { restaurantPayment } = await this.createRestaurantPayment.execute(body)

        return {
            restaurantPayment: RestaurantPaymentViewModel.toHTTP(restaurantPayment)
        }
    }

    @Put()
    async update(@Body() body: SaveRestaurantPaymentBody): Promise<{ restaurantPayment: IRestaurantPaymentView }> {
      const { restaurantPayment } = await this.saveRestaurantPayment.execute(body)
  
      return {
        restaurantPayment: RestaurantPaymentViewModel.toHTTP(restaurantPayment),
      }
    }  

    @Patch('delete/:restaurantPaymentId')
    async delete(
      @Param('restaurantPaymentId') restaurantPaymentId: string,
    ): Promise<{ restaurantPayment: IRestaurantPaymentView }> {
      const { restaurantPayment } = await this.deleteRestaurantPayment.execute({
        restaurantPaymentId,
      })
  
      return {
        restaurantPayment: RestaurantPaymentViewModel.toHTTP(restaurantPayment),
      }
    }
}
