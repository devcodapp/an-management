import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { OwnersRepository } from '@modules/owner/repositories/owner-repository';
import { RestaurantTypesRepository } from '@modules/restaurant-type/repositories/restaurant-type-repository';
import { RestaurantsRepository } from '@modules/restaurant/repositories/restaurant-repository';
import { TablesRepository } from '@modules/table/repositories/table-repository';
import { UsersRepository } from '@modules/user/repositories/user-repository';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { Module } from '@nestjs/common';

import { RoleRepository } from '@modules/role/repositories/role-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCouponRepository } from './prisma/repositories/prisma-coupon-repository';
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository';
import { PrismaRestaurantRepository } from './prisma/repositories/prisma-restaurant-repository';
import { PrismaRestaurantTypeRepository } from './prisma/repositories/prisma-restaurant-type-repository';
import { PrismaRoleRepository } from './prisma/repositories/prisma-role-repository';
import { PrismaTableRepository } from './prisma/repositories/prisma-table-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaWorkerRepository } from './prisma/repositories/prisma-worker-repository';
import { RestaurantPaymentRepository } from '@modules/restaurant-payment/repositories/restaurant-payment-repository';
import { PrismaRestaurantPaymentRepository } from './prisma/repositories/prisma-restaurant-payment-repository';

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
    {
      provide: OwnersRepository,
      useClass: PrismaOwnerRepository,
    },
    {
      provide: RoleRepository,
      useClass: PrismaRoleRepository,
    },
    {
      provide: RestaurantPaymentRepository,
      useClass: PrismaRestaurantPaymentRepository
    }
  ],
  exports: [
    RestaurantsRepository,
    WorkerRepository,
    TablesRepository,
    CouponsRepository,
    UsersRepository,
    RestaurantTypesRepository,
    OwnersRepository,
    RoleRepository,
    RestaurantPaymentRepository
  ],
})
export class DatabaseModule {}
