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
  ],
  exports: [
    CategoryAdditionalsRepository,
    AdditionalsRepository,
    CompaniesRepository,
    CategoryProductsRepository,
  ],
})
export class DatabaseModule {}
