import { Module } from '@nestjs/common';
import { AdditionalController } from './additional.controller';
import { CreateAdditional } from './use-cases/create-additional';
import { SaveAdditional } from './use-cases/save-additional';
import { DeleteAdditional } from './use-cases/delete-additional';
import { GetAdditional } from './use-cases/get-additional';
import { FilterAdditional } from './use-cases/filter-additional';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  controllers: [AdditionalController],
  providers: [
    CreateAdditional,
    SaveAdditional,
    DeleteAdditional,
    GetAdditional,
    FilterAdditional,
  ],
  imports: [DatabaseModule],
})
export class AdditionalModule {}
