import { Inject, Injectable } from '@nestjs/common';
import { CategoryAdditional } from '../entities/category-additional';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';
import { CategoryAdditionalNotFound } from './errors/category-additional-not-found';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface DeleteCategoryAdditionalRequest {
  categoryAdditionalId: string;
}
interface DeleteCategoryAdditionalResponse {
  categoryAdditional: CategoryAdditional;
}

@Injectable()
export class DeleteCategoryAdditional {
  constructor(
    private categoryAdditionalRepository: CategoryAdditionalsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteCategoryAdditionalRequest,
  ): Promise<DeleteCategoryAdditionalResponse> {
    const { categoryAdditionalId } = request;

    const categoryAdditional =
      await this.categoryAdditionalRepository.categoryAdditional(
        categoryAdditionalId,
      );

    if (!categoryAdditional) {
      throw new CategoryAdditionalNotFound();
    }

    categoryAdditional.delete(this.req['user'].sub);

    await this.categoryAdditionalRepository.save(categoryAdditional);

    return { categoryAdditional };
  }
}
