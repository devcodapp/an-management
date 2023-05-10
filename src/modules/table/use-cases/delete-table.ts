import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';
import { Table } from '../entities/table';
import { TableNotFound } from './errors/table-not-found';
interface DeleteTableRequest {
  tableId: string;
}
interface DeleteTableResponse {
  table: Table;
}

@Injectable()
export class DeleteTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: DeleteTableRequest): Promise<DeleteTableResponse> {
    const { tableId } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    table.deletedAt = new Date();
    table.deletedWorker = '123';
    await this.tableRepository.save(table);

    return { table };
  }
}
