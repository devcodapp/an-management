import { AddUserRole } from '@modules/role/use-cases/add-user-role';
import { CreateUser } from '@modules/user/use-cases/create-user';
import { SaveUser } from '@modules/user/use-cases/save-user';
import { Module } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { CreateWorker } from './use-cases/create-worker';
import { DeleteWorker } from './use-cases/delete-worker';
import { DisableWorker } from './use-cases/disable-worker';
import { EnableWorker } from './use-cases/enable-worker';
import { FilterWorker } from './use-cases/filter-worker';
import { GetWorker } from './use-cases/get-worker';
import { PaginationWorker } from './use-cases/pagination-worker';
import { SaveWorker } from './use-cases/save-worker';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  controllers: [WorkerController],
  providers: [
    CloudinaryService,
    WorkerService,
    CreateWorker,
    DeleteWorker,
    FilterWorker,
    SaveWorker,
    GetWorker,
    CreateUser,
    SaveUser,
    DisableWorker,
    EnableWorker,
    AddUserRole,
    PaginationWorker
  ],
  exports: [WorkerService],
  imports: [DatabaseModule],
})
export class WorkerModule {}
