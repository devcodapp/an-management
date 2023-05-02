import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';
import { Table } from '../entities/table';

interface GetTableRequest {
  id: string;
}

interface GetTableResponse {
  table: Table | null;
}

@Injectable()
export class GetTable {
  constructor(private tableRepository: TablesRepository) {}

  async execute(request: GetTableRequest): Promise<GetTableResponse> {
    const { id } = request;

    const table = await this.tableRepository.table(id);

    return { table };
  }
}
