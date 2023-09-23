import { Module } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { RestaurantController } from './restaurant.controller';
import { CloseRestaurant } from './use-cases/close-restaurant';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { GetSlugRestaurant } from './use-cases/get-slug-restaurant';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { SaveRestaurant } from './use-cases/save-restaurant';

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
    GetSlugRestaurant,
    CloudinaryService,
    KafkaService,
  ],
})
export class RestaurantModule {}
