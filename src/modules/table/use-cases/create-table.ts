import { Table } from '../entities/table';
import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';

interface CreateTableRequest {
  name: string;
  companyId: string;
  amountOfChairs: number;
}
interface CreateTableResponse {
  table: Table;
}

@Injectable()
export class CreateTable {
  constructor(private tablesRepository: TablesRepository) {}

  async execute(request: CreateTableRequest): Promise<CreateTableResponse> {
    const { companyId, name, amountOfChairs } = request;
    const table = new Table(
      {
        name,
        companyId,
        amountOfChairs,
      },
      { createdWorker: '123' },
    );

    await this.tablesRepository.create(table);

    return {
      table,
    };
  }
}
