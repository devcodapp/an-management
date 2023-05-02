import { Injectable } from '@nestjs/common';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { OptionNotFound } from '@modules/option/use-cases/errors/option-not-found';
import { Option } from '@modules/option/entities/option';
import { SubOptionNotFound } from './errors/suboption-not-found';

interface DisableSubOptionRequest {
  subOptionName: string;
  optionId: string;
}

interface DisableSubOptionResponse {
  option: Option;
}

@Injectable()
export class DisableSubOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(
    request: DisableSubOptionRequest,
  ): Promise<DisableSubOptionResponse> {
    const { subOptionName, optionId } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    const suboption = option.suboption(subOptionName);

    if (!suboption) {
      throw new SubOptionNotFound();
    }

    suboption.disable();

    option.removeSubOption(subOptionName);

    await this.optionRepository.save(option);

    return { option };
  }
}
