import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { OptionNotFound } from './errors/option-not-found';

interface DisableAdditionalRequest {
  id: string;
}
interface DisableOptionResponse {
  option: Option;
}

@Injectable()
export class DisableOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(
    request: DisableAdditionalRequest,
  ): Promise<DisableOptionResponse> {
    const { id } = request;

    const option = await this.optionRepository.option(id);

    if (!option) {
      throw new OptionNotFound();
    }

    option.disabledAt = new Date();

    await this.optionRepository.save(option);

    return { option };
  }
}
