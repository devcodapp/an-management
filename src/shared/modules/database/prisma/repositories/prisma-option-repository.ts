import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { PrismaOptionMapper } from '../mappers/prisma-option-mapper';
import { Option } from '@modules/option/entities/option';
import { OptionFilterInput } from '@modules/option/interfaces/option-filter.input';

@Injectable()
export class PrismaOptionRepository implements OptionRepository {
  constructor(private prisma: PrismaService) {}

  async create(option: Option): Promise<void> {
    const raw = PrismaOptionMapper.toPrisma(option);

    await this.prisma.option.create({
      data: { ...raw },
    });
  }
  async option(optionId: string): Promise<Option | null> {
    const option = await this.prisma.option.findUnique({
      where: { id: optionId },
    });

    if (!option) {
      return null;
    }

    return PrismaOptionMapper.toDomain(option);
  }

  async options(filters: OptionFilterInput): Promise<Option[] | null> {
    const options = await this.prisma.option.findMany({
      where: { ...filters, name: { contains: filters.name }, deletedAt: null },
      orderBy: { name: 'asc' },
    });

    return options.map(PrismaOptionMapper.toDomain);
  }

  async save(option: Option): Promise<void> {
    const { id, ...raw } = PrismaOptionMapper.toPrisma(option);

    await this.prisma.option.update({
      data: { ...raw },
      where: { id },
    });
  }
}
