import { Table } from '../entities/table';

export class TableViewModel {
  static toHTTP(table: Table): ITableView {
    return {
      id: table.id,
      name: table.name,
      amountOfChairs: table.amountOfChairs,
      disabledAt: table.disabledAt,
      restaurantId: table.restaurantId,
    };
  }
}

export interface ITableView {
  id: string;
  name: string;
  amountOfChairs: number;
  disabledAt?: Date;
  restaurantId: string;
}
