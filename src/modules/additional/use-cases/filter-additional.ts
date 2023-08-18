import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';

interface FilterAdditionalRequest {
  name?: string;
  categoryId?: string;
  price?: number;
  deleted?: boolean;
}

interface FilterAdditionalResponse {
  additionals: Additional[] | null;
}

@Injectable()
export class FilterAdditional {
  constructor(private additionalRepository: AdditionalsRepository) {}

  async execute(
    request: FilterAdditionalRequest,
  ): Promise<FilterAdditionalResponse> {
    const additionals = await this.additionalRepository.additionals(request);

    return { additionals };
  }
}
