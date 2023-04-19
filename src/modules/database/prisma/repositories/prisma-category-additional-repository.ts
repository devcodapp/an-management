import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { PrismaCategoryAdditionalMapper } from '../mappers/prisma-category-additional-mapper';

@Injectable()
export class PrismaCategoryAdditionalRepository
  implements CategoryAdditionalsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(categoryAdditional: CategoryAdditional): Promise<void> {
    const raw = PrismaCategoryAdditionalMapper.toPrisma(categoryAdditional);

    await this.prisma.categoryAdditional.create({
      data: raw,
    });
  }
  categoryAdditional(
    categoryAdditionalId: string,
  ): Promise<CategoryAdditional | null> {
    throw new Error('Method not implemented.');
  }
  categoryAdditionals(filters: any): Promise<CategoryAdditional[] | null> {
    throw new Error('Method not implemented.');
  }
  save(categoryAdditional: CategoryAdditional): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(categoryAdditionalId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
