import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { OptionNotFound } from './errors/option-not-found';

interface SaveOptionRequest {
  optionId: string;
  name?: string;
  description?: string;
  defaultPrice?: number;
}
interface SaveOptionResponse {
  option: Option;
}

@Injectable()
export class SaveOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(request: SaveOptionRequest): Promise<SaveOptionResponse> {
    const { optionId, ...updateFields } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    Object.assign(option, updateFields);

    await this.optionRepository.save(option);

    return { option };
  }
}
