import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';

interface GetAdditionalRequest {
  id: string;
}

interface GetAdditionalResponse {
  additional: Additional | null;
}

@Injectable()
export class GetAdditional {
  constructor(private additionalRepository: AdditionalsRepository) {}

  async execute(request: GetAdditionalRequest): Promise<GetAdditionalResponse> {
    const { id } = request;

    const additional = await this.additionalRepository.additional(id);

    return { additional };
  }
}
