import { FilterTableBody } from '@modules/table/dtos/filter-table.body';
import { Table } from '@modules/table/entities/table';
import { TablesRepository } from '@modules/table/repositories/table-repository';
import { Injectable } from '@nestjs/common';

import { PrismaTableMapper } from '../mappers/prisma-table-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
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

  async tables({
    deleted,
    ...filters
  }: FilterTableBody): Promise<Table[] | null> {
    const tables = await this.prisma.table.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.amountOfChairs && {amountOfChairs: filters.amountOfChairs}),
        ...(filters.restaurantId && {restaurantId: filters.restaurantId}),
        ...(filters.isOccupied != undefined && {isOccupied: filters.isOccupied}),
        ...(filters.isReserved != undefined && {isReserved: filters.isReserved}),
        ...(filters.disabled != undefined && {disabled: filters.disabled}),
        deleted: deleted,
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
