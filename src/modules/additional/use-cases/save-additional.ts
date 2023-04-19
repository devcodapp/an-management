import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';
import { AdditionalNotFound } from './errors/additional-not-found';

interface SaveAdditionalRequest {
  additionalId: string;
  name?: string;
  price?: number;
  categoryId?: string;
}
interface SaveAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class SaveAdditional {
  constructor(private additionalRepository: AdditionalsRepository) {}

  async execute(
    request: SaveAdditionalRequest,
  ): Promise<SaveAdditionalResponse> {
    const { additionalId, categoryId, price, name } = request;

    const additional = await this.additionalRepository.additional(additionalId);

    if (!additional) {
      throw new AdditionalNotFound();
    }

    name ? (additional.name = name) : null;
    categoryId ? (additional.categoryId = categoryId) : null;
    price ? (additional.price = price) : null;

    await this.additionalRepository.save(additional);

    return { additional };
  }
}
