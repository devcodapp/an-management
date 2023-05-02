import { SubOption } from '@modules/suboption/entities/subOption';
import { Option } from '../entities/option';

export class OptionViewModel {
  static toHTTP(option: Option): IOptionView {
    const {
      id,
      name,
      description,
      defaultPrice,
      suboptions,
      createdUser,
      deletedUser,
      disabledAt,
      deletedAt,
      createdAt,
    } = option;
    return {
      id,
      name,
      description,
      defaultPrice,
      suboptions,
      createdUser,
      deletedUser,
      disabledAt,
      deletedAt,
      createdAt,
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
  disabledAt?: Date;
  createdAt?: Date;
  createdUser: string;
  deletedAt?: Date | null;
  deletedUser?: string | null;
}
