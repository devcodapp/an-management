import { GetUserOwner } from '@modules/owner/use-cases/get-user-owner';
import { Module } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { RestaurantDeliveryFeesController } from './restaurant-delivery-fees.controller';
import { RestaurantOpeningHoursController } from './restaurant-opening-hours.controller';
import { RestaurantController } from './restaurant.controller';
import { CloseRestaurant } from './use-cases/close-restaurant';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { AddDeliveryFee } from './use-cases/deliveryFees/add-delivery-fee';
import { DisableDeliveryFee } from './use-cases/deliveryFees/disable-delivery-fee';
import { EnableDeliveryFee } from './use-cases/deliveryFees/enable-delivery-fee';
import { RemoveDeliveryFee } from './use-cases/deliveryFees/remove-delivery-fee';
import { SaveDeliveryFee } from './use-cases/deliveryFees/save-delivery-fee';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { GetOwnerRestaurant } from './use-cases/get-owner-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { GetSlugRestaurant } from './use-cases/get-slug-restaurant';
import { GetUserRestaurant } from './use-cases/get-user-restaurant';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { AddOpeningHour } from './use-cases/openingHours/add-opening-hour';
import { RemoveOpeningHour } from './use-cases/openingHours/remove-opening-hour';
import { SaveOpeningHour } from './use-cases/openingHours/save-opening-hour';
import { SaveRestaurant } from './use-cases/save-restaurant';

@Module({
  controllers: [RestaurantController, RestaurantOpeningHoursController, RestaurantDeliveryFeesController],
  imports: [DatabaseModule],
  providers: [
    CreateRestaurant,
    SaveRestaurant,
    GetRestaurant,
    FilterRestaurant,
    DisableRestaurant,
    OpenRestaurant,
    CloseRestaurant,
    AddOpeningHour,
    RemoveOpeningHour,
    SaveOpeningHour,
    AddDeliveryFee,
    RemoveDeliveryFee,
    SaveDeliveryFee,
    DisableDeliveryFee,
    EnableDeliveryFee,
    GetSlugRestaurant,
    GetOwnerRestaurant,
    GetUserRestaurant,
    CloudinaryService,
    GetUserOwner,
    KafkaService,
  ],
})
export class RestaurantModule {}
