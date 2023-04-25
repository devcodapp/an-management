import { Injectable } from '@nestjs/common';
import { OptionRepository } from '../repositories/option-repository';
import { Option } from '../entities/option';

interface GetOptionRequest {
  id: string;
}

interface GetAdditionalResponse {
  option: Option | null;
}

@Injectable()
export class GetOption {
  constructor(private optionRepository: OptionRepository) { }

  async execute(request: GetOptionRequest): Promise<GetAdditionalResponse> {
    const { id } = request;

    const option = await this.optionRepository.option(id);

    return { option };
  }
}
