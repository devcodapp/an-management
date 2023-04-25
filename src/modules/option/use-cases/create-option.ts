import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { SubOption } from '../entities/suboption';

interface CreateOptionRequest {
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions: SubOption[];
  companyId: string;
}
interface CreateOptionResponse {
  option: Option;
}

@Injectable()
export class CreateOption {
  constructor(private optionRepository: OptionRepository) { }

  async execute(request: CreateOptionRequest): Promise<CreateOptionResponse> {
    const { name, suboptions, defaultPrice, description, companyId } = request;
    const option = new Option(
      {
        name,
        description,
        defaultPrice,
        suboptions,
        companyId,
        desabledAt: undefined,
      },
      { createdUser: '123' },
    );

    await this.optionRepository.create(option);

    return {
      option,
    };
  }
}
