import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { OptionRepository } from '@modules/option/repositories/option-repository';
import { OptionNotFound } from '@modules/option/use-cases/errors/option-not-found';
import { Option } from '@modules/option/entities/option';
import { SubOptionNotFound } from './errors/suboption-not-found';

interface DeleteSubOptionRequest {
  subOptionName: string;
  optionId: string;
}

interface DeleteSubOptionResponse {
  option: Option;
}

@Injectable()
export class DeleteSubOption {
  constructor(
    private optionRepository: OptionRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async execute(
    request: DeleteSubOptionRequest,
  ): Promise<DeleteSubOptionResponse> {
    const { subOptionName, optionId } = request;
    const option = await this.optionRepository.option(optionId);

    if (!option) {
      throw new OptionNotFound();
    }

    const sb = option.suboption(subOptionName);

    if (!sb) {
      throw new SubOptionNotFound();
    }

    await this.cloudinary.deleteImage(sb.imageId);

    option.removeSubOption(subOptionName);

    await this.optionRepository.save(option);

    return { option };
  }
}
