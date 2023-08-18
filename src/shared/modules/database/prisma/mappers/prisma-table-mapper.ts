import { Table } from '@modules/table/entities/table';
import { Table as RawTable } from '@prisma/client';

export class PrismaTableMapper {
  static toPrisma(table: Table) {
    return {
      id: table.id,
      name: table.name,
      disabledAt: table.disabledAt,
      amountOfChairs: table.amountOfChairs,
      restaurantId: table.restaurantId,
      createdAt: table.createdAt,
      createdUser: table.createdUser,
      deletedAt: table.deletedAt,
      deletedUser: table.deletedUser,
      deleted: table.deleted,
    };
  }

  static toDomain(raw: RawTable) {
    return new Table(
      {
        amountOfChairs: raw.amountOfChairs,
        name: raw.name,
        disabledAt: raw.disabledAt || undefined,
        restaurantId: raw.restaurantId,
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
        deleted: raw.deleted,
      },
    );
  }
}
