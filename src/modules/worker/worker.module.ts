import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorker } from './use-cases/create-worker';
import { DeleteWorker } from './use-cases/delete-worker';
import { FilterWorker } from './use-cases/filter-worker';
import { SaveWorker } from './use-cases/save-worker';
import { GetWorker } from './use-cases/get-worker';
import { WorkerController } from './worker.controller';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { DatabaseModule } from '@shared/modules/database/database.module';

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
  ],
  exports: [WorkerService],
  imports: [DatabaseModule],
})
export class WorkerModule {}
