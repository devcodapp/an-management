import { Additional } from '@modules/additional/entities/additional';
import { AdditionalFilterInput } from '@modules/additional/interfaces/additional-filter.input';
import { AdditionalsRepository } from '@modules/additional/repositories/additional-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAdditionalMapper } from '../mappers/prisma-additional-mapper';

@Injectable()
export class PrismaAdditionalRepository implements AdditionalsRepository {
  constructor(private prisma: PrismaService) {}

  async create(additional: Additional): Promise<void> {
    const raw = PrismaAdditionalMapper.toPrisma(additional);

    await this.prisma.additional.create({
      data: { ...raw },
    });
  }
  async additional(additionalId: string): Promise<Additional | null> {
    const additional = await this.prisma.additional.findUnique({
      where: { id: additionalId },
      include: { category: true },
    });

    if (!additional) {
      return null;
    }

    return PrismaAdditionalMapper.toDomain(additional);
  }

  async additionals(
    filters: AdditionalFilterInput,
  ): Promise<Additional[] | null> {
    const { category, ...filtersQuery } = filters;
    const additionals = await this.prisma.additional.findMany({
      where: {
        ...(filtersQuery ? filtersQuery : {}),
        ...(filtersQuery.name ? { name: { contains: filtersQuery.name } } : {}),
      },
      orderBy: { name: 'asc' },
      include: { category },
    });

    return additionals.map(PrismaAdditionalMapper.toDomain);
  }

  async save(additional: Additional): Promise<void> {
    const { id, ...raw } = PrismaAdditionalMapper.toPrisma(additional);

    await this.prisma.additional.update({
      data: { ...raw },
      where: { id },
    });
  }
}
