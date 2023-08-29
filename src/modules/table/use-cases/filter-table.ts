import { Injectable } from '@nestjs/common';

import { FilterTableBody } from '../dtos/filter-table.body';
import { Table } from '../entities/table';
import { TablesRepository } from '../repositories/table-repository';

interface FilterTableResponse {
  tables: Table[] | null;
}

@Injectable()
export class FilterTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: FilterTableBody): Promise<FilterTableResponse> {

    const tables = await this.tableRepository.tables(request);

    return { tables };
  }
}
