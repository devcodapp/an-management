import { FilterTableBody } from '../dtos/filter-table.body';
import { Table } from '../entities/table';

export abstract class TablesRepository {
  abstract create(table: Table): Promise<void>;

  abstract table(tableId: string): Promise<Table | null>;

  abstract tables(filters: FilterTableBody): Promise<Table[] | null>;

  abstract save(table: Table): Promise<void>;
}
