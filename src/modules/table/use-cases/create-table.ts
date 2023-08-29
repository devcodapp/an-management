import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { CreateTableBody } from '../dtos/create-table.body';
import { Table } from '../entities/table';
import { TablesRepository } from '../repositories/table-repository';

interface CreateTableResponse {
  table: Table;
}

@Injectable()
export class CreateTable {
  constructor(
    private tablesRepository: TablesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateTableBody): Promise<CreateTableResponse> {
    const { restaurantId, name, amountOfChairs } = request;
    const table = new Table(
      {
        name,
        restaurantId,
        amountOfChairs,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.tablesRepository.create(table);

    return {
      table,
    };
  }
}
