import { CategoryAdditional } from '../entities/category-additional';
import { Injectable } from '@nestjs/common';
import { CategoryAdditionalsRepository } from '../repositories/category-additional-repository';

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
  ) {}

  async execute(
    request: CreateCategoryAdditionalRequest,
  ): Promise<CreateCategoryAdditionalResponse> {
    const { companyId, name, order } = request;

    const categoryAdditional = new CategoryAdditional(
      {
        name,
        order,
        companyId,
      },
      { createdUser: '123' },
    );

    await this.categoryAdditionalRepository.create(categoryAdditional);

    return {
      categoryAdditional,
    };
  }
}
