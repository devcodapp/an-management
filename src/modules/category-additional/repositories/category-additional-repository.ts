import { CategoryAdditional } from '../entities/category-additional';
import { CategoryAdditionalFilterInput } from '../interfaces/category-additional-filter.input';

export abstract class CategoryAdditionalsRepository {
  abstract create(categoryAdditional: CategoryAdditional): Promise<void>;

  abstract categoryAdditional(
    categoryAdditionalId: string,
  ): Promise<CategoryAdditional | null>;

  abstract categoryAdditionals(
    filters: CategoryAdditionalFilterInput,
  ): Promise<CategoryAdditional[] | null>;

  abstract save(categoryAdditional: CategoryAdditional): Promise<void>;

  abstract delete(categoryAdditionalId: string): Promise<void>;
}
