import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { PrismaCategoryAdditionalRepository } from './prisma/repositories/prisma-category-additional-repository';
import { AdditionalsRepository } from '@modules/additional/repositories/additional-repository';
import { PrismaAdditionalRepository } from './prisma/repositories/prisma-additional-repository';
import { CompaniesRepository } from '@modules/company/repositories/company-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';
import { CategoryProductsRepository } from '@modules/category-product/repositories/category-product-repository';
import { PrismaCategoryProductRepository } from './prisma/repositories/prisma-category-product-repository';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { PrismaOptionRepository } from './prisma/repositories/prisma-option-repository';
import { WorkerRepository } from '@modules/worker/repositories/worker-repository';
import { PrismaWorkerRepository } from './prisma/repositories/prisma-worker-repository';

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
      provide: CompaniesRepository,
      useClass: PrismaCompanyRepository,
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
  ],
  exports: [
    CategoryAdditionalsRepository,
    AdditionalsRepository,
    CompaniesRepository,
    CategoryProductsRepository,
    OptionRepository,
    WorkerRepository,
  ],
})
export class DatabaseModule {}
