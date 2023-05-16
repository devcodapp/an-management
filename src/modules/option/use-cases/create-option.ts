import { Inject, Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
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
  constructor(
    private optionRepository: OptionRepository,
    @Inject(REQUEST) private req: Request,
  ) {}

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
      { createdUser: this.req['user'].sub },
    );

    await this.optionRepository.create(option);

    return {
      option,
    };
  }
}
