import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { FilterOptions } from './use-cases/filter-option';
import { GetOption } from './use-cases/get-option';
import { DeleteOption } from './use-cases/delete-option';
import { SaveOption } from './use-cases/save-option';
import { CreateOption } from './use-cases/create-option';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { DisableOption } from './use-cases/disable-option';
import { EnableOption } from './use-cases/enable-option';

@Module({
  controllers: [OptionController],
  providers: [
    CreateOption,
    SaveOption,
    DeleteOption,
    GetOption,
    FilterOptions,
    DisableOption,
    EnableOption,
  ],
  imports: [DatabaseModule],
})
export class OptionModule {}
