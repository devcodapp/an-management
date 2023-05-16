import { Inject, Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';
import { AdditionalNotFound } from './errors/additional-not-found';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
interface DeleteAdditionalRequest {
  additionalId: string;
}
interface DeleteAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class DeleteAdditional {
  constructor(
    private additionalRepository: AdditionalsRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteAdditionalRequest,
  ): Promise<DeleteAdditionalResponse> {
    const { additionalId } = request;

    const additional = await this.additionalRepository.additional(additionalId);

    if (!additional) {
      throw new AdditionalNotFound();
    }

    additional.delete(this.req['user'].sub);

    await this.additionalRepository.save(additional);

    return { additional };
  }
}
