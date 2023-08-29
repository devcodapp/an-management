import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { Table } from '../entities/table';
import { TablesRepository } from '../repositories/table-repository';
import { TableNotFound } from './errors/table-not-found';

interface DeleteTableRequest {
  tableId: string;
}
interface DeleteTableResponse {
  table: Table;
}

@Injectable()
export class DeleteTable {
  constructor(
    private tableRepository: TablesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: DeleteTableRequest): Promise<DeleteTableResponse> {
    const { tableId } = request;

    const table = await this.tableRepository.table(tableId);

    if (!table) {
      throw new TableNotFound();
    }

    table.delete(this.req['user'].sub);

    await this.tableRepository.save(table);

    return { table };
  }
}
