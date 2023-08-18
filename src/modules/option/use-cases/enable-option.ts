import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { OptionNotFound } from './errors/option-not-found';

interface EnableAdditionalRequest {
  id: string;
}
interface EnableOptionResponse {
  option: Option;
}

@Injectable()
export class EnableOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(
    request: EnableAdditionalRequest,
  ): Promise<EnableOptionResponse> {
    const { id } = request;

    const option = await this.optionRepository.option(id);

    if (!option) {
      throw new OptionNotFound();
    }

    option.enable();

    await this.optionRepository.save(option);

    return { option };
  }
}
