import { Additional } from '../entities/additional';
import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';

interface CreateAdditionalRequest {
  name: string;
  categoryId: string;
  imageUrl: string;
  price: number;
}
interface CreateAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class CreateAdditional {
  constructor(private additionalsRepository: AdditionalsRepository) {}

  async execute(
    request: CreateAdditionalRequest,
  ): Promise<CreateAdditionalResponse> {
    const { categoryId, imageUrl, name, price } = request;

    const additional = new Additional(
      {
        name,
        categoryId,
        imageUrl,
        price,
      },
      { createdUser: '123' },
    );

    await this.additionalsRepository.create(additional);

    return {
      additional,
    };
  }
}
