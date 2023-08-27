import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { RestaurantTypesRepository } from '@modules/restaurant-type/repositories/restaurant-type-repository';
import { RestaurantsRepository } from '@modules/restaurant/repositories/restaurant-repository';
import { TablesRepository } from '@modules/table/repositories/table-repository';
import { UsersRepository } from '@modules/user/repositories/user-repository';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCouponRepository } from './prisma/repositories/prisma-coupon-repository';
import { PrismaRestaurantRepository } from './prisma/repositories/prisma-restaurant-repository';
import { PrismaRestaurantTypeRepository } from './prisma/repositories/prisma-restaurant-type-repository';
import { PrismaTableRepository } from './prisma/repositories/prisma-table-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaWorkerRepository } from './prisma/repositories/prisma-worker-repository';

@Module({
  providers: [
    PrismaService,
   
    {
      provide: RestaurantsRepository,
      useClass: PrismaRestaurantRepository,
    },
    
    {
      provide: WorkerRepository,
      useClass: PrismaWorkerRepository,
    },
    
    {
      provide: TablesRepository,
      useClass: PrismaTableRepository,
    },
    {
      provide: CouponsRepository,
      useClass: PrismaCouponRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: RestaurantTypesRepository,
      useClass: PrismaRestaurantTypeRepository,
    },
  ],
  exports: [
    RestaurantsRepository,
    WorkerRepository,
    TablesRepository,
    CouponsRepository,
    UsersRepository,
    RestaurantTypesRepository,
  ],
})
export class DatabaseModule {}
