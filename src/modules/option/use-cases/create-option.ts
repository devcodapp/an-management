import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option';
import { OptionRepository } from '../repositories/option-repository';
import { SubOption } from '../entities/suboption';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

interface CreateOptionRequest {
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions: { item: SubOption; image: Express.Multer.File }[];
  companyId: string;
}
interface CreateOptionResponse {
  option: Option;
}

@Injectable()
export class CreateOption {
  constructor(
    private optionRepository: OptionRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(request: CreateOptionRequest): Promise<CreateOptionResponse> {
    const {
      name,
      suboptions: suboptionsRaw,
      defaultPrice,
      description,
      companyId,
    } = request;

    const suboptionsPromises = suboptionsRaw.map(async (suboption) => {
      const { image, item } = suboption;
      const uploadedImage = await this.cloudinary.uploadImage(image);
      item.imageId = uploadedImage.public_id;
      item.imageUrl = uploadedImage.url;
      return item;
    });

    const suboptions = await Promise.all(suboptionsPromises);

    const option = new Option(
      {
        name,
        description,
        defaultPrice,
        suboptions,
        companyId,
        disabledAt: undefined,
      },
      { createdUser: '123' },
    );

    await this.optionRepository.create(option);

    return {
      option,
    };
  }
}
