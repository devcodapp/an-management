import { Table } from '@modules/table/entities/table';
import { Injectable } from '@nestjs/common';

import { TablesRepository } from '../repositories/table-repository';
import { TableNotFound } from './errors/table-not-found';

interface EnableTableRequest {
  tableId: string;
}

interface EnableTableResponse {
  table: Table;
}

@Injectable()
export class EnableTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: EnableTableRequest): Promise<EnableTableResponse> {
    const { tableId } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    table.enable();

    await this.tableRepository.save(table);

    return { table };
  }
}
