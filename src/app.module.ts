import { ProductModule } from '@modules/product/product.module';
import { TableModule } from '@modules/table/table.module';
import { WorkerModule } from '@modules/worker/worker.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from '@shared/modules/cloudinary/cloudinary.module';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { AdditionalModule } from './modules/additional/additional.module';
import { CategoryAdditionalModule } from './modules/category-additional/category-additional.module';
import { CategoryProductModule } from './modules/category-product/category-product.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { OptionModule } from './modules/option/option.module';
import { ProductVariantOptionModule } from './modules/product-variant-option/product-variant-option.module';
import { ProductVariantModule } from './modules/product-variant/product-variant.module';
import { RestaurantTypeModule } from './modules/restaurant-type/restaurant-type.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { SuboptionModule } from './modules/suboption/suboption.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { KafkaModule } from './shared/modules/kafka/kafka.module';
import { UserModule } from './shared/modules/user/user.module';

@Module({
  imports: [
    // CategoryAdditionalModule,
    DatabaseModule,
    // AdditionalModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // OptionModule,
    RestaurantModule,
    // CategoryProductModule,
    // SuboptionModule,
    AuthModule,
    WorkerModule,
    // ProductModule,
    // ProductVariantModule,
    // ProductVariantOptionModule,
    TableModule,
    CouponModule,
    UserModule,
    AuthModule,
    RestaurantTypeModule,
    KafkaModule,
  ],
  // providers: [
  //   { provide: APP_FILTER, useClass: InternalServerErrorExceptionFilter },
  // ],
})
export class AppModule {}
