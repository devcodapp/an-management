import { Injectable } from '@nestjs/common';

import { FilterRestaurantPaymentBody } from '../dtos/filter-restaurant-payment.body';
import { RestaurantPayment } from '../entities/restaurant-payment';
import { RestaurantPaymentRepository } from '../repositories/restaurant-payment-repository';

interface FilterRestaurantPaymentResponse {
  restaurantPayments: RestaurantPayment[] | null;
}

@Injectable()
export class FilterRestaurantPayment {
  constructor(private restaurantPaymentRepository: RestaurantPaymentRepository) {}
  async execute(request: FilterRestaurantPaymentBody): Promise<FilterRestaurantPaymentResponse> {
    const restaurantPayments = await this.restaurantPaymentRepository.restaurantPayments(request);

    return { restaurantPayments };
  }
}
