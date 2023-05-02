import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/modules/database/database.module';
import { TableController } from './table.controller';

@Module({
  controllers: [TableController],
  providers: [],
  imports: [DatabaseModule],
})
export class TableModule {}
