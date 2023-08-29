import { Injectable } from '@nestjs/common';

import { SaveTableBody } from '../dtos/save-table.body';
import { Table } from '../entities/table';
import { TablesRepository } from '../repositories/table-repository';
import { TableNotFound } from './errors/table-not-found';

interface SaveTableResponse {
  table: Table;
}

@Injectable()
export class SaveTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: SaveTableBody): Promise<SaveTableResponse> {
    const { tableId, ...updatedFields } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    Object.assign(table, updatedFields);

    await this.tableRepository.save(table);

    return { table };
  }
}
