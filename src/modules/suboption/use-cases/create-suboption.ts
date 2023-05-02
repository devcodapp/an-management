import { Injectable } from '@nestjs/common';
import { SubOption } from '../entities/subOption';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { OptionNotFound } from '@modules/option/use-cases/errors/option-not-found';
import { Option } from '@modules/option/entities/option';
import { SubOptionAlreadExists } from './errors/suboption-already-exists';

interface CreateSubOptionRequest {
  name: string;
  price?: number;
  image: Express.Multer.File;
  optionId: string;
}

interface CreateSubOptionResponse {
  option: Option;
}

@Injectable()
export class CreateSubOption {
  constructor(
    private optionRepository: OptionRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: CreateSubOptionRequest,
  ): Promise<CreateSubOptionResponse> {
    const { name, image, optionId, price } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    const hasSubOptionWithSameName = option.suboption(name);

    if (hasSubOptionWithSameName) throw new SubOptionAlreadExists();

    const { public_id, url } = await this.cloudinary.uploadImage(image);

    const subOption = new SubOption({
      name,
      imageId: public_id,
      imageUrl: url,
      price: price,
    });

    option.addSubOption(subOption);

    await this.optionRepository.save(option);

    return { option };
  }
}
