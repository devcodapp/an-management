import { Additional } from '../entities/additional';
import { AdditionalFilterInput } from '../interfaces/additional-filter.input';

export abstract class AdditionalsRepository {
  abstract create(additional: Additional): Promise<void>;

  abstract additional(additionalId: string): Promise<Additional | null>;

  abstract additionals(
    filters: AdditionalFilterInput,
  ): Promise<Additional[] | null>;

  abstract save(additional: Additional): Promise<void>;
}
