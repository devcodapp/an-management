import { Module } from '@nestjs/common';
import { RestaurantTypeController } from './restaurant-type.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { CreateRestaurantType } from './use-cases/create-restaurant-type';
import { DeleteRestaurantType } from './use-cases/delete-restaurant-type';
import { FilterRestaurantType } from './use-cases/filter-restaurant';

@Module({
  controllers: [RestaurantTypeController],
  imports: [DatabaseModule],
  providers: [CreateRestaurantType, DeleteRestaurantType, FilterRestaurantType],
})
export class RestaurantTypeModule {}
