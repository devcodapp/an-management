import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { RestaurantPaymentController } from './restaurant-payment.controller';
import { CreateRestaurantPayment } from './use-cases/create-restaurant-payment';
import { SaveRestaurantPayment } from './use-cases/save-restaurant-payment';
import { DeleteRestaurantPayment } from './use-cases/delete-restaurant-payment';
import { GetRestaurantPayment } from './use-cases/get-restaurant-payment';
import { FilterRestaurantPayment } from './use-cases/filter-restaurant-payment';

@Module({
  controllers: [RestaurantPaymentController],
  imports: [DatabaseModule],
  providers: [
    CreateRestaurantPayment, 
    SaveRestaurantPayment, 
    DeleteRestaurantPayment, 
    GetRestaurantPayment,
    FilterRestaurantPayment,
    // KafkaService
  ],
})
export class RestaurantPaymentModule {}
