import { SubOption } from '@modules/suboption/entities/subOption';
import { Option } from '../entities/option';

export class OptionViewModel {
  static toHTTP({
    id,
    name,
    description,
    defaultPrice,
    restaurantId,
    suboptions: rawSuboption,
  }: Option): IOptionView {
    const suboptions: any = rawSuboption?.map(
      ({ imageUrl, name, price, disabledAt, imageId }) => ({
        imageUrl,
        name,
        price,
        disabledAt,
        imageId,
      }),
    );

    return {
      id,
      name,
      description,
      defaultPrice,
      restaurantId,
      suboptions,
    };
  }
}

export interface IOptionView {
  id: string;
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions?: Partial<SubOption[]>;
  restaurantId?: string;
}
