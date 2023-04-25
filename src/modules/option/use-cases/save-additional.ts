import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';
import { Option } from '../entities/option';
import { SubOption } from '../entities/suboption';
import { OptionRepository } from '../repositories/option-repository';
import { OptionNotFound } from './errors/option-not-found';

interface SaveAdditionalRequest {
  id: string;
  name?: string;
  description?: string;
  defaultPrice?: number;
  suboption?: Array<SubOption>;
}
interface SaveOptionResponse {
  option: Option;
}

@Injectable()
export class SaveOption {
  constructor(private optionRepository: OptionRepository) { }

  async execute(request: SaveAdditionalRequest): Promise<SaveOptionResponse> {
    const { id, suboption, defaultPrice, description, name } = request;

    const option = await this.optionRepository.option(id);

    if (!option) {
      throw new OptionNotFound();
    }

    name ? (option.name = name) : null;
    suboption ? (option.suboptions = suboption) : null;
    description ? (option.description = description) : null;
    defaultPrice ? (option.defaultPrice = defaultPrice) : null;

    await this.optionRepository.save(option);

    return { option };
  }
}
