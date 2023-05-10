import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
interface CreateOptionRequest {
  name: string;
  description: string;
  defaultPrice?: number;
  companyId: string;
}
interface CreateOptionResponse {
  option: Option;
}

@Injectable()
export class CreateOption {
  constructor(private optionRepository: OptionRepository) {}

  async execute(request: CreateOptionRequest): Promise<CreateOptionResponse> {
    const { name, defaultPrice, description, companyId } = request;

    const option = new Option(
      {
        name,
        description,
        defaultPrice,
        companyId,
        disabledAt: undefined,
      },
      { createdWorker: '123' },
    );

    await this.optionRepository.create(option);

    return {
      option,
    };
  }
}
