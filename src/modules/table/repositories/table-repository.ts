import { Table } from '../entities/table';
import { TableFilterInput } from '../interfaces/table-filter.input';

export abstract class TablesRepository {
  abstract create(table: Table): Promise<void>;

  abstract table(tableId: string): Promise<Table | null>;

  abstract tables(filters: TableFilterInput): Promise<Table[] | null>;

  abstract save(table: Table): Promise<void>;
}
