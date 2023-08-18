import { Injectable } from '@nestjs/common';

import { CategoryAdditional } from '../entities/category-additional';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';

interface FilterCategoryAdditionalRequest {
  name?: string;
  restaurantId?: string;
  deleted?: boolean;
}

interface FilterCategoryAdditionalResponse {
  categoryAdditionals: CategoryAdditional[] | null;
}

@Injectable()
export class FilterCategoryAdditional {
  constructor(
    private categoryAdditionalRepository: CategoryAdditionalsRepository,
  ) {}

  async execute(
    request: FilterCategoryAdditionalRequest,
  ): Promise<FilterCategoryAdditionalResponse> {
    const categoryAdditionals =
      await this.categoryAdditionalRepository.categoryAdditionals(request);

    return { categoryAdditionals };
  }
}
