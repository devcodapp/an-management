import { Injectable } from '@nestjs/common';
import { OptionNotFound } from './errors/option-not-found';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
interface DeleteAdditionalRequest {
  optionId: string;
}
interface DeleteAdditionalResponse {
  option: Option;
}

@Injectable()
export class DeleteOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(
    request: DeleteAdditionalRequest,
  ): Promise<DeleteAdditionalResponse> {
    const { optionId } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    option.deletedAt = new Date();
    option.deletedUser = '123';
    await this.optionRepository.save(option);

    return { option };
  }
}
