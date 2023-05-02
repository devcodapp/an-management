import { SubOption } from '@modules/suboption/entities/subOption';
import { Option } from '../entities/option';

export class OptionViewModel {
  static toHTTP(option: Option): IOptionView {
    const suboptions: any = [];
    option.suboptions?.map((item) => {
      const sub = {
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
        disabledAt: item.disabledAt,
      };
    });
    return {
      id: option.id,
      name: option.name,
      description: option.description,
      defaultPrice: option.defaultPrice,
      companyId: option.companyId,
      suboptions,
    };
  }
}

export interface IOptionView {
  id: string;
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions?: SubOption[];
  companyId?: string;
}
