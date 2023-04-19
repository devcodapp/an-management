import { CategoryAdditionalsRepository } from '@modules/category-additional/repositories/category-additional-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { PrismaCategoryAdditionalMapper } from '../mappers/prisma-category-additional-mapper';
import { CategoryAdditionalFilterInput } from '@modules/category-additional/interfaces/category-additional-filter.input';

@Injectable()
export class PrismaCategoryAdditionalRepository
  implements CategoryAdditionalsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(categoryAdditional: CategoryAdditional): Promise<void> {
    const raw = PrismaCategoryAdditionalMapper.toPrisma(categoryAdditional);

    await this.prisma.categoryAdditional.create({
      data: { ...raw, order: raw.order.value },
    });
  }
  async categoryAdditional(
    categoryAdditionalId: string,
  ): Promise<CategoryAdditional | null> {
    const categoryAdditional = await this.prisma.categoryAdditional.findUnique({
      where: { id: categoryAdditionalId },
    });

    if (!categoryAdditional) {
      return null;
    }

    return PrismaCategoryAdditionalMapper.toDomain(categoryAdditional);
  }

  async categoryAdditionals(
    filters: CategoryAdditionalFilterInput,
  ): Promise<CategoryAdditional[] | null> {
    const categoryAdditionals = await this.prisma.categoryAdditional.findMany({
      where: { ...filters, name: { contains: filters.name } },
      orderBy: { name: 'asc' },
    });
    return categoryAdditionals.map(PrismaCategoryAdditionalMapper.toDomain);
  }

  async save(categoryAdditional: CategoryAdditional): Promise<void> {
    const { id, ...raw } =
      PrismaCategoryAdditionalMapper.toPrisma(categoryAdditional);
    await this.prisma.categoryAdditional.update({
      data: { ...raw, order: raw.order.value },
      where: { id },
    });
  }
}
