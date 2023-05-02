import { Option } from '@modules/option/entities/option';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { OptionNotFound } from '@modules/option/use-cases/errors/option-not-found';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { SubOptionNotFound } from './errors/suboption-not-found';

interface SaveSubOptionRequest {
  optionId: string;
  oldName: string;
  name?: string;
  price?: number;
  image?: Express.Multer.File;
}

interface SaveSubOptionResponse {
  option: Option;
}

@Injectable()
export class SaveSubOption {
  constructor(
    private optionRepository: OptionRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveSubOptionRequest): Promise<SaveSubOptionResponse> {
    const { optionId, image, name, price, oldName } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    const sb = option.suboption(oldName);

    if (!sb) {
      throw new SubOptionNotFound();
    }

    if (image) {
      await this.cloudinary.deleteImage(sb?.imageId);

      const { public_id, url } = await this.cloudinary.uploadImage(image);
      sb.imageId = public_id;
      sb.imageUrl = url;
    }

    name && (sb.name = name);
    price && (sb.price = price);

    option.updateSubOption(oldName, sb);

    await this.optionRepository.save(option);

    return { option };
  }
}
