import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { PrismaCategoryAdditionalRepository } from './prisma/repositories/prisma-category-additional-repository';
import { AdditionalsRepository } from '@modules/additional/repositories/additional-repository';
import { PrismaAdditionalRepository } from './prisma/repositories/prisma-additional-repository';
import { RestaurantsRepository } from '@modules/restaurant/repositories/restaurant-repository';
import { PrismaRestaurantRepository } from './prisma/repositories/prisma-restaurant-repository';
import { CategoryProductsRepository } from '@modules/category-product/repositories/category-product-repository';
import { PrismaCategoryProductRepository } from './prisma/repositories/prisma-category-product-repository';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { PrismaOptionRepository } from './prisma/repositories/prisma-option-repository';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { PrismaWorkerRepository } from './prisma/repositories/prisma-worker-repository';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';
import { TablesRepository } from '@modules/table/repositories/table-repository';
import { PrismaTableRepository } from './prisma/repositories/prisma-table-repository';
import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { PrismaCouponRepository } from './prisma/repositories/prisma-coupon-repository';
import { UsersRepository } from '../user/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryAdditionalsRepository,
      useClass: PrismaCategoryAdditionalRepository,
    },
    {
      provide: AdditionalsRepository,
      useClass: PrismaAdditionalRepository,
    },
    {
      provide: RestaurantsRepository,
      useClass: PrismaRestaurantRepository,
    },
    {
      provide: CategoryProductsRepository,
      useClass: PrismaCategoryProductRepository,
    },
    {
      provide: OptionRepository,
      useClass: PrismaOptionRepository,
    },
    {
      provide: WorkerRepository,
      useClass: PrismaWorkerRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductRepository,
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
  ],
  exports: [
    CategoryAdditionalsRepository,
    AdditionalsRepository,
    RestaurantsRepository,
    CategoryProductsRepository,
    OptionRepository,
    WorkerRepository,
    ProductsRepository,
    TablesRepository,
    CouponsRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
