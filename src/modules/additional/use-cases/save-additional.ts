import { Injectable } from '@nestjs/common';
import { AdditionalsRepository } from '../repositories/additional-repository';
import { Additional } from '../entities/additional';
import { AdditionalNotFound } from './errors/additional-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface SaveAdditionalRequest {
  additionalId: string;
  name?: string;
  price?: number;
  categoryId?: string;
  image?: Express.Multer.File;
}
interface SaveAdditionalResponse {
  additional: Additional;
}

@Injectable()
export class SaveAdditional {
  constructor(
    private additionalRepository: AdditionalsRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: SaveAdditionalRequest,
  ): Promise<SaveAdditionalResponse> {
    const { additionalId, categoryId, price, name, image } = request;

    const additional = await this.additionalRepository.additional(additionalId);

    if (!additional) {
      throw new AdditionalNotFound();
    }

    if (image) {
      await this.cloudinary.deleteImage(additional.imageId);

      const uploadedImage = await this.cloudinary.uploadImage(image);
      additional.imageId = uploadedImage.public_id;
      additional.imageUrl = uploadedImage.url;
    }

    name ? (additional.name = name) : null;
    categoryId ? (additional.categoryId = categoryId) : null;
    price ? (additional.price = price) : null;

    await this.additionalRepository.save(additional);

    return { additional };
  }
}
