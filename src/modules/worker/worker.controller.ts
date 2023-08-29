import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { CreateWorkerBody } from './dtos/create-worker.body';
import { FilterWorkerBody } from './dtos/filter-worker.body';
import { SaveWorkerBody } from './dtos/save-worker.body';
import { CreateWorker } from './use-cases/create-worker';
import { DeleteWorker } from './use-cases/delete-worker';
import { FilterWorker } from './use-cases/filter-worker';
import { GetWorker } from './use-cases/get-worker';
import { SaveWorker } from './use-cases/save-worker';
import { IWorkerView, WorkerViewModel } from './view-models/worker';

@UseGuards(AuthGuard)
@UseInterceptors(BooleanInterceptor)
@Controller('worker')
export class WorkerController {
  constructor(
    private createWorker: CreateWorker,
    private getWorker: GetWorker,
    private filterWorker: FilterWorker,
    private saveWorker: SaveWorker,
    private deleteWorker: DeleteWorker,
  ) {}

  @Get()
  async workers(
    @Query() query: FilterWorkerBody,
  ): Promise<{ worker: IWorkerView[] } | null> {
    const { workers } = await this.filterWorker.execute(query);

    if (!workers) {
      return null;
    }

    return {
      worker: workers?.map(WorkerViewModel.toHTTP),
    };
  }

  @Get(':id')
  async worker(
    @Param('id') id: string,
  ): Promise<{ worker: IWorkerView } | null> {
    const { worker } = await this.getWorker.execute({
      id,
    });

    if (!worker) {
      return null;
    }

    return {
      worker: WorkerViewModel.toHTTP(worker),
    };
  }

  @Post()
  async create(
    @Body() body: CreateWorkerBody,
  ): Promise<{ worker: IWorkerView }> {
    const { worker } = await this.createWorker.execute(body);
    return {
      worker: WorkerViewModel.toHTTP(worker),
    };
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveWorkerBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ worker: IWorkerView }> {
    const { worker } = await this.saveWorker.execute({
      ...body,
      image,
    });

    return {
      worker: WorkerViewModel.toHTTP(worker),
    };
  }

  @Patch('delete/:workerId')
  async delete(
    @Param('workerId') workerId: string,
  ): Promise<{ worker: IWorkerView }> {
    const { worker } = await this.deleteWorker.execute({
      workerId,
    });

    return {
      worker: WorkerViewModel.toHTTP(worker),
    };
  }
}
