import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';
import { AdditionalNotFound } from './errors/additional-not-found';
interface DeleteAdditionalRequest {
  additionalId: string;
}
interface DeleteAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class DeleteAdditional {
  constructor(private additionalRepository: AdditionalsRepository) {}

  async execute(
    request: DeleteAdditionalRequest,
  ): Promise<DeleteAdditionalResponse> {
    const { additionalId } = request;

    const additional = await this.additionalRepository.additional(additionalId);

    if (!additional) {
      throw new AdditionalNotFound();
    }

    additional.deletedAt = new Date();
    additional.deletedUser = '123';
    await this.additionalRepository.save(additional);

    return { additional };
  }
}
