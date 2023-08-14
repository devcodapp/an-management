import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { SaveRestaurant } from './use-cases/save-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { CloseRestaurant } from './use-cases/close-restaurant';

@Module({
  controllers: [RestaurantController],
  imports: [DatabaseModule],
  providers: [
    CreateRestaurant,
    SaveRestaurant,
    GetRestaurant,
    FilterRestaurant,
    DisableRestaurant,
    OpenRestaurant,
    CloseRestaurant,
    CloudinaryService,
  ],
})
export class RestaurantModule {}
