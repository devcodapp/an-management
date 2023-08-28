import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

import { CreateTableBody } from './dtos/create-table-body';
import { FilterTableBody } from './dtos/filter-table-body';
import { SaveTableBody } from './dtos/save-table-body';
import { CreateTableSwagger, DeleteTableSwagger, DisableTableSwagger, EnableTableSwagger, FilterTableSwagger, GetTableSwagger } from './swagger/table.swagger';
import { CreateTable } from './use-cases/create-table';
import { DeleteTable } from './use-cases/delete-table';
import { DisableTable } from './use-cases/disable-table';
import { EnableTable } from './use-cases/enable-table';
import { FilterTable } from './use-cases/filter-table';
import { GetTable } from './use-cases/get-table';
import { SaveTable } from './use-cases/save-table';
import { ITableView, TableViewModel } from './view-models/table';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(
    private getTable: GetTable,
    private createTable: CreateTable,
    private seveTable: SaveTable,
    private filterTable: FilterTable,
    private deleteTable: DeleteTable,
    private disableTable: DisableTable,
    private enableTable: EnableTable,
  ) {}

  @Post()
  // @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(CreateTableSwagger)
  @ApiBody({ type: CreateTableBody })
  async create(@Body() body: CreateTableBody): Promise<{ table: ITableView }> {
    const { table } = await this.createTable.execute({
      ...body,
    });

    return {
      table: TableViewModel.toHTTP(table),
    };
  }

  @Get(':id')
  @ApiOperation(GetTableSwagger)
  async adittional(
    @Param('id') id: string,
  ): Promise<{ table: ITableView } | null> {
    const { table } = await this.getTable.execute({
      id,
    });

    if (!table) {
      return null;
    }

    return {
      table: TableViewModel.toHTTP(table),
    };
  }

  @Get()
  @ApiOperation(FilterTableSwagger)
  async table(
    @Query() query: FilterTableBody,
  ): Promise<{ tables: ITableView[] } | null> {
    const { tables } = await this.filterTable.execute(query);

    if (!tables) return null;

    return { tables: tables.map(TableViewModel.toHTTP) };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveTableBody })
  async update(@Body() body: SaveTableBody): Promise<{ table: ITableView }> {
    const { table } = await this.seveTable.execute({
      ...body,
    });

    return {
      table: TableViewModel.toHTTP(table),
    };
  }

  @Patch(':tableId')
  @ApiOperation(DeleteTableSwagger)
  async delete(
    @Param('tableId') tableId: string,
  ): Promise<{ table: ITableView }> {
    const { table } = await this.deleteTable.execute({
      tableId,
    });

    return {
      table: TableViewModel.toHTTP(table),
    };
  }

  @Patch(':tableId/disable')
  @ApiOperation(DisableTableSwagger)
  async disable(
    @Param('tableId') tableId: string,
  ): Promise<{ table: ITableView }> {
    const { table } = await this.disableTable.execute({
      tableId,
    });

    return {
      table: TableViewModel.toHTTP(table),
    };
  }
  @Patch(':tableId/enable')
  @ApiOperation(EnableTableSwagger)
  async enable(
    @Param('tableId') tableId: string,
  ): Promise<{ table: ITableView }> {
    const { table } = await this.enableTable.execute({
      tableId,
    });

    return {
      table: TableViewModel.toHTTP(table),
    };
  }
}
