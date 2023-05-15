import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaTableMapper } from '../mappers/prisma-table-mapper';
import { TablesRepository } from '@modules/table/repositories/table-repository';
import { Table } from '@modules/table/entities/table';
import { TableFilterInput } from '@modules/table/interfaces/table-filter.input';

@Injectable()
export class PrismaTableRepository implements TablesRepository {
  constructor(private prisma: PrismaService) {}

  async create(table: Table): Promise<void> {
    const raw = PrismaTableMapper.toPrisma(table);

    await this.prisma.table.create({
      data: { ...raw },
    });
  }
  async table(tableId: string): Promise<Table | null> {
    const table = await this.prisma.table.findUnique({
      where: { id: tableId },
    });

    if (!table) {
      return null;
    }

    return PrismaTableMapper.toDomain(table);
  }

  async tables(filters: TableFilterInput): Promise<Table[] | null> {
    const tables = await this.prisma.table.findMany({
      where: {
        ...(filters ? filters : {}),
        ...(filters.name ? { name: { contains: filters.name } } : {}),
        deletedAt: null,
      },

      orderBy: { name: 'asc' },
    });
    return tables.map(PrismaTableMapper.toDomain);
  }

  async save(table: Table): Promise<void> {
    const { id, ...raw } = PrismaTableMapper.toPrisma(table);
    await this.prisma.table.update({
      data: { ...raw },
      where: { id },
    });
  }
}
