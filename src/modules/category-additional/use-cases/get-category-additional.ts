import { Injectable } from '@nestjs/common';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';
import { CategoryAdditional } from '../entities/category-additional';

interface GetCategoryAdditionalRequest {
  id: string;
}

interface GetCategoryAdditionalResponse {
  categoryAdditional: CategoryAdditional | null;
}

@Injectable()
export class GetCategoryAdditional {
  constructor(
    private categoryAdditionalRepository: CategoryAdditionalsRepository,
  ) {}

  async execute(
    request: GetCategoryAdditionalRequest,
  ): Promise<GetCategoryAdditionalResponse> {
    const { id } = request;

    const categoryAdditional =
      await this.categoryAdditionalRepository.categoryAdditional(id);

    return { categoryAdditional };
  }
}
