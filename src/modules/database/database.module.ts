import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { PrismaCategoryAdditionalRepository } from './prisma/repositories/prisma-category-additional-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryAdditionalsRepository,
      useClass: PrismaCategoryAdditionalRepository,
    },
  ],
  exports: [CategoryAdditionalsRepository],
})
export class DatabaseModule {}
