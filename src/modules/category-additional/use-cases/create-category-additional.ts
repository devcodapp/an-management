import { CategoryAdditional } from '../entities/category-additional';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';
import { Order } from '@shared/entities/order';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateCategoryAdditionalRequest {
  name: string;
  order: number;
  companyId: string;
}
interface CreateCategoryAdditionalResponse {
  categoryAdditional: CategoryAdditional;
}

@Injectable()
export class CreateCategoryAdditional {
  constructor(
    private categoryAdditionalRepository: CategoryAdditionalsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: CreateCategoryAdditionalRequest,
  ): Promise<CreateCategoryAdditionalResponse> {
    const { companyId, name, order } = request;

    const categoryAdditional = new CategoryAdditional(
      {
        name,
        order: new Order(order),
        companyId,
      },
      { createdUser: this.req['user'].sub },
    );

    await this.categoryAdditionalRepository.create(categoryAdditional);

    return {
      categoryAdditional,
    };
  }
}
