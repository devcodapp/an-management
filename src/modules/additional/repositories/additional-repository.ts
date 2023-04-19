import { Additional } from '@app/entities/additional';
import { AdditionalFilterInput } from '../interfaces/additional-filter.input';

export abstract class AdditionalsRepository {
  abstract create(additional: Additional): Promise<void>;

  abstract additional(additionalId: string): Promise<Additional | null>;

  abstract additionals(
    filters: AdditionalFilterInput,
  ): Promise<Additional[] | null>;

  abstract save(Additional: Additional): Promise<void>;

  abstract delete(AdditionalId: string): Promise<void>;
}
