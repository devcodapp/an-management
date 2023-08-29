import { Table } from '../entities/table';

export class TableViewModel {
  static toHTTP(table: Table): ITableView {
    return {
      id: table.id,
      name: table.name,
      amountOfChairs: table.amountOfChairs,
      disabled: table.disabled,
      isOccupied: table.isOccupied,
      isReserved: table.isReserved,
      restaurantId: table.restaurantId,
    };
  }
}

export interface ITableView {
  id: string;
  name: string;
  amountOfChairs: number;
  isOccupied: boolean;
  isReserved: boolean;
  disabled: Boolean;
  restaurantId: string;
}
