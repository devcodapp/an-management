import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { PrismaCategoryAdditionalRepository } from './prisma/repositories/prisma-category-additional-repository';
import { AdditionalsRepository } from '@modules/additional/repositories/additional-repository';
import { PrismaAdditionalRepository } from './prisma/repositories/prisma-additional-repository';
import { CompaniesRepository } from '@modules/company/repositories/company-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';

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
  ],
  exports: [
    CategoryAdditionalsRepository,
    AdditionalsRepository,
    CompaniesRepository,
  ],
})
export class DatabaseModule {}
