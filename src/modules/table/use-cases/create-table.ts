import { Table } from '../entities/table';
import { Inject, Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateTableRequest {
  name: string;
  restaurantId: string;
  amountOfChairs: number;
}
interface CreateTableResponse {
  table: Table;
}

@Injectable()
export class CreateTable {
  constructor(
    private tablesRepository: TablesRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(request: CreateTableRequest): Promise<CreateTableResponse> {
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
