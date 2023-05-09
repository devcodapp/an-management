import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Put,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateWorkerBody } from './dtos/create-worker-body';
import { FilterWorkerBody } from './dtos/filter-worker-body';
import { SaveWorkerBody } from './dtos/save-worker-body';
import {
  FilterWorkerSwagger,
  GetWorkerSwagger,
  CreateWorkerSwagger,
  UpdateWorkerSwagger,
  DeleteWorkerSwagger,
} from './swagger/worker.swagger';
import { CreateWorker } from './use-cases/create-worker';
import { DeleteWorker } from './use-cases/delete-worker';
import { FilterWorker } from './use-cases/filter-worker';
import { GetWorker } from './use-cases/get-worker';
import { SaveWorker } from './use-cases/save-worker';
import { IWorkerView, WorkerViewModel } from './view-models/worker';

@ApiTags('Worker')
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
  @ApiOperation(FilterWorkerSwagger)
  async worker(
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
  @ApiOperation(GetWorkerSwagger)
  async categoryAdittional(
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
  @ApiConsumes('multipart/form-data')
  @ApiOperation(CreateWorkerSwagger)
  @ApiBody({ type: CreateWorkerBody })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateWorkerBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ worker: IWorkerView }> {
    const { worker } = await this.createWorker.execute({
      ...body,
      image,
    });
    return {
      worker: WorkerViewModel.toHTTP(worker),
    };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveWorkerBody })
  @ApiOperation(UpdateWorkerSwagger)
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

  @Patch(':workerId')
  @ApiOperation(DeleteWorkerSwagger)
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
