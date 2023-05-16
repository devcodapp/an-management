import { Inject, Injectable } from '@nestjs/common';
import { OptionNotFound } from './errors/option-not-found';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
interface DeleteAdditionalRequest {
  optionId: string;
}
interface DeleteAdditionalResponse {
  option: Option;
}

@Injectable()
export class DeleteOption {
  constructor(
    private optionRepository: OptionRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: DeleteAdditionalRequest,
  ): Promise<DeleteAdditionalResponse> {
    const { optionId } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    option.delete(this.req['user'].sub);

    await this.optionRepository.save(option);

    return { option };
  }
}
