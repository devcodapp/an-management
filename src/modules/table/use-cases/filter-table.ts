import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';
import { Table } from '../entities/table';

interface FilterTableRequest {
  name?: string;
  categoryId?: string;
  price?: number;
}

interface FilterTableResponse {
  tables: Table[] | null;
}

@Injectable()
export class FilterTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: FilterTableRequest): Promise<FilterTableResponse> {
    const tables = await this.tableRepository.tables(request);

    return { tables };
  }
}
