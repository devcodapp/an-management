import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';

interface FilterOptionRequest {
  name?: string;
  price?: number;
  companyId: string;
}

interface FilterOptionResponse {
  option: Option[] | null;
}

@Injectable()
export class FilterOptios {
  constructor(private optionRepository: OptionRepository) { }

  async execute(request: FilterOptionRequest): Promise<FilterOptionResponse> {
    const option = await this.optionRepository.options(request);

    return { option };
  }
}
