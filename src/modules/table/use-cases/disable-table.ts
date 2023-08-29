import { Table } from '@modules/table/entities/table';
import { Injectable } from '@nestjs/common';

import { TablesRepository } from '../repositories/table-repository';
import { TableNotFound } from './errors/table-not-found';

interface DisableTableRequest {
  tableId: string;
}

interface DisableTableResponse {
  table: Table;
}

@Injectable()
export class DisableTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: DisableTableRequest): Promise<DisableTableResponse> {
    const { tableId } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    table.disable();

    await this.tableRepository.save(table);

    return { table };
  }
}
