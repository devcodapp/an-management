import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { SubOption } from '../entities/suboption';
import { OptionRepository } from '../repositories/option-repository';
import { OptionNotFound } from './errors/option-not-found';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface SaveOptionRequest {
  optionId: string;
  name?: string;
  description?: string;
  defaultPrice?: number;
  suboptions?: { item: SubOption; image: Express.Multer.File }[];
}
interface SaveOptionResponse {
  option: Option;
}

@Injectable()
export class SaveOption {
  constructor(
    private optionRepository: OptionRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: SaveOptionRequest): Promise<SaveOptionResponse> {
    const {
      optionId,
      name,
      suboptions: suboptionsRaw,
      defaultPrice,
      description,
    } = request;

    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    let suboptions: SubOption[] = [] as SubOption[];
    if (suboptionsRaw) {
      const suboptionsPromises = suboptionsRaw?.map(async (suboption) => {
        const { image, item } = suboption;
        if (image) {
          await this.cloudinary.deleteImage(
            option.suboptions?.find((so) => so?.id === item?.id)?.imageId ?? '',
          );
          const uploadedImage = await this.cloudinary.uploadImage(image);
          item.imageId = uploadedImage.public_id;
          item.imageUrl = uploadedImage.url;
        }
        return item;
      });

      suboptions = await Promise.all(suboptionsPromises);
    }

    name ? (option.name = name) : null;
    suboptions ? (option.suboptions = suboptions) : null;
    description ? (option.description = description) : null;
    defaultPrice ? (option.defaultPrice = defaultPrice) : null;

    await this.optionRepository.save(option);

    return { option };
  }
}
