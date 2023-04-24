import { Option } from '../entities/option';
import { OptionFilterInput } from '../interfaces/option-filter.input';

export abstract class CategoryAdditionalsRepository {
  abstract create(option: Option): Promise<void>;

  abstract option(optionId: string): Promise<Option | null>;

  abstract options(filters: OptionFilterInput): Promise<Option[] | null>;

  abstract save(option: Option): Promise<void>;
}
