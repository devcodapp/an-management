import { TableModule } from '@modules/table/table.module';
import { UserModule } from '@modules/user/user.module';
import { WorkerModule } from '@modules/worker/worker.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from '@shared/modules/cloudinary/cloudinary.module';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { OwnerModule } from '@modules/owner/owner.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { RestaurantTypeModule } from './modules/restaurant-type/restaurant-type.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { KafkaModule } from './shared/modules/kafka/kafka.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RestaurantModule,
    AuthModule,
    WorkerModule,
    TableModule,
    CouponModule,
    UserModule,
    AuthModule,
    RestaurantTypeModule,
    KafkaModule,
    OwnerModule,
    RoleModule,
  ],

})
export class AppModule {}
