import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { TableController } from './table.controller';
import { CreateTable } from './use-cases/create-table';
import { DeleteTable } from './use-cases/delete-table';
import { DisableTable } from './use-cases/disable-table';
import { EnableTable } from './use-cases/enable-table';
import { FilterTable } from './use-cases/filter-table';
import { GetTable } from './use-cases/get-table';
import { SaveTable } from './use-cases/save-table';

@Module({
  controllers: [TableController],
  providers: [
    CreateTable,
    SaveTable,
    DeleteTable,
    GetTable,
    FilterTable,
    DisableTable,
    EnableTable,
  ],
  imports: [DatabaseModule],
})
export class TableModule {}
