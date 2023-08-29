import { Injectable } from '@nestjs/common';

import { Table } from '../entities/table';
import { TablesRepository } from '../repositories/table-repository';

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
