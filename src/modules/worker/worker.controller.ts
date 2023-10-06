import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationProps } from '@shared/dtos/pagination-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { NumberInterceptor } from 'src/interceptors/number/number.interceptor';

import { CreateWorkerBody } from './dtos/create-worker.body';
import { FilterWorkerBody } from './dtos/filter-worker.body';
import { SaveWorkerBody } from './dtos/save-worker.body';
import { WorkerPaginated } from './entities/worker';
import { CreateWorker } from './use-cases/create-worker';
import { DeleteWorker } from './use-cases/delete-worker';
import { DisableWorker } from './use-cases/disable-worker';
import { EnableWorker } from './use-cases/enable-worker';
import { FilterWorker } from './use-cases/filter-worker';
import { GetWorker } from './use-cases/get-worker';
import { PaginationWorker } from './use-cases/pagination-worker';
import { SaveWorker } from './use-cases/save-worker';
import { IWorkerView, WorkerViewModel } from './view-models/worker';

@UseGuards(AuthGuard)
@UseInterceptors(BooleanInterceptor, NumberInterceptor, ClassSerializerInterceptor)
@Controller('worker')
export class WorkerController {
  constructor(
    private createWorker: CreateWorker,
    private getWorker: GetWorker,
    private filterWorker: FilterWorker,
    private saveWorker: SaveWorker,
    private deleteWorker: DeleteWorker,
    private disableWorker: DisableWorker,
    private enableWorker: EnableWorker,
    private paginationWorker: PaginationWorker
  ) { }

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

  @Get('pagination')
  async workersPagination(
    @Query() query: FilterWorkerBody,
    @Query() pagination: PaginationProps
  ): Promise<WorkerPaginated> {
    const workers = await this.paginationWorker.execute(query, pagination);

    return {
      items: workers?.items?.map(WorkerViewModel.toHTTP),
      pagination: workers.pagination
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

  @Patch('disable')
  async disable(
    @Body() { workerIds }: { workerIds: string[] },
  ): Promise<{ workers: IWorkerView[] }> {
    const { workers } = await this.disableWorker.execute({ workerIds });

    return {
      workers: workers?.map(WorkerViewModel.toHTTP),
    };
  }

  @Patch('enable')
  async enable(
    @Body() { workerIds }: { workerIds: string[] },
  ): Promise<{ workers: IWorkerView[] }> {
    const { workers } = await this.enableWorker.execute({
      workerIds,
    });

    return {
      workers: workers?.map(WorkerViewModel.toHTTP),
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
