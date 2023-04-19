import { Injectable } from '@nestjs/common';
import { CategoryAdditional } from '../entities/category-additional';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';
import { CategoryAdditionalNotFound } from './errors/category-additional-not-found';

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

    categoryAdditional.deletedAt = new Date();
    categoryAdditional.deletedUser = '123';

    await this.categoryAdditionalRepository.save(categoryAdditional);

    return { categoryAdditional };
  }
}
