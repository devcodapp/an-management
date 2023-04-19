import { CategoryAdditional } from '../entities/category-additional';
import { Injectable } from '@nestjs/common';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';
import { CategoryAdditionalNotFound } from './errors/category-additional-not-found';

interface SaveCategoryAdditionalRequest {
  categoryAdditionalId: string;
  name?: string;
  order?: number;
}
interface SaveCategoryAdditionalResponse {
  categoryAdditional: CategoryAdditional;
}

@Injectable()
export class SaveCategoryAdditional {
  constructor(
    private categoryAdditionalRepository: CategoryAdditionalsRepository,
  ) {}

  async execute(
    request: SaveCategoryAdditionalRequest,
  ): Promise<SaveCategoryAdditionalResponse> {
    const { categoryAdditionalId, name, order } = request;

    const categoryAdditional =
      await this.categoryAdditionalRepository.categoryAdditional(
        categoryAdditionalId,
      );

    if (!categoryAdditional) {
      throw new CategoryAdditionalNotFound();
    }

    name ? (categoryAdditional.name = name) : null;
    order ? (categoryAdditional.order = order) : null;

    await this.categoryAdditionalRepository.save(categoryAdditional);

    return { categoryAdditional };
  }
}
