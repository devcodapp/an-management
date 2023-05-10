import { Table } from '@modules/table/entities/table';
import { Table as RawTable } from '@prisma/client';

export class PrismaTableMapper {
  static toPrisma(table: Table) {
    return {
      id: table.id,
      name: table.name,
      disabledAt: table.disabledAt,
      amountOfChairs: table.amountOfChairs,
      companyId: table.companyId,
      createdAt: table.createdAt,
      createdWorker: table.createdWorker,
      deletedAt: table.deletedAt,
      deletedWorker: table.deletedWorker,
    };
  }

  static toDomain(raw: RawTable) {
    return new Table(
      {
        amountOfChairs: raw.amountOfChairs,
        name: raw.name,
        disabledAt: raw.disabledAt || undefined,
        companyId: raw.companyId,
      },
      {
        createdAt: raw.createdAt,
        createdWorker: raw.createdWorker,
        deletedAt: raw.deletedAt,
        deletedWorker: raw.deletedWorker,
        id: raw.id,
      },
    );
  }
}
