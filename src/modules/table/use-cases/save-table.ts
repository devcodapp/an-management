import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';
import { Table } from '../entities/table';
import { TableNotFound } from './errors/table-not-found';

interface SaveTableRequest {
  tableId: string;
  name: string;
  amountOfChairs: number;
}
interface SaveTableResponse {
  table: Table;
}

@Injectable()
export class SaveTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: SaveTableRequest): Promise<SaveTableResponse> {
    const { name, amountOfChairs, tableId } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    name ? (table.name = name) : null;
    amountOfChairs ? (table.amountOfChairs = amountOfChairs) : null;

    await this.tableRepository.save(table);

    return { table };
  }
}
