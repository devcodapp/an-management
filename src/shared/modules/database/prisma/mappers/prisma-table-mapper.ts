import { Table } from '@modules/table/entities/table';
import { Table as RawTable } from '@prisma/client';

export class PrismaTableMapper {
  static toPrisma(table: Table) {
    const newTable = {} as any
    for(const field in table['props']){
      newTable[field] = table['props'][field]
    }
    for(const field in table) {
      if(field.startsWith('_')){
        const newField = field.split('_')[1]
        newTable[newField] = table[field]
      }
    }
    return newTable
  }

  static toDomain(raw: RawTable) {
    return new Table(
      {
        amountOfChairs: raw.amountOfChairs,
        name: raw.name,
        disabledAt: raw.disabledAt || undefined,
        restaurantId: raw.restaurantId,
        disabled: raw.disabled,
        isOccupied: raw.isOccupied,
        isReserved: raw.isReserved
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
