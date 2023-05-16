import { Additional } from '../entities/additional';
import { Inject, Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

interface CreateAdditionalRequest {
  name: string;
  categoryId: string;
  price: number;
  image: Express.Multer.File;
}
interface CreateAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class CreateAdditional {
  constructor(
    private additionalsRepository: AdditionalsRepository,
    private cloudinary: CloudinaryService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async execute(
    request: CreateAdditionalRequest,
  ): Promise<CreateAdditionalResponse> {
    const { categoryId, name, price, image } = request;
    const uploadedImage = await this.cloudinary.uploadImage(image);
    const additional = new Additional(
      {
        name,
        categoryId,
        imageUrl: uploadedImage.url,
        imageId: uploadedImage.public_id,
        price: Number(price),
      },
      { createdUser: this.req['user'].sub },
    );

    await this.additionalsRepository.create(additional);

    return {
      additional,
    };
  }
}
