import { Module } from '@nestjs/common';
import { SuboptionController } from './suboption.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { DisableSubOption } from './use-cases/disable-suboption';
import { DeleteSubOption } from './use-cases/delete-suboption';
import { SaveSubOption } from './use-cases/save-suboption';
import { CreateSubOption } from './use-cases/create-suboption';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [SuboptionController],
  providers: [
    CreateSubOption,
    SaveSubOption,
    DeleteSubOption,
    DisableSubOption,
    CloudinaryService,
  ],
  imports: [DatabaseModule],
})
export class SuboptionModule {}
