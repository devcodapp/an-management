import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';

interface FilterOptionRequest {
  name?: string;
  price?: number;
  companyId: string;
}

interface FilterOptionResponse {
  options: Option[] | null;
}

@Injectable()
export class FilterOptions {
  constructor(private optionRepository: OptionRepository) {}

  async execute(request: FilterOptionRequest): Promise<FilterOptionResponse> {
    const options = await this.optionRepository.options(request);

    return { options };
  }
}
