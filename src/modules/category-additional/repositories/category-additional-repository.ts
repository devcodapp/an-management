import { CategoryAdditional } from '../entities/category-additional';

export abstract class CategoryAdditionalsRepository {
  abstract create(categoryAdditional: CategoryAdditional): Promise<void>;

  abstract findById(
    categoryAdditionalId: string,
  ): Promise<CategoryAdditional | null>;

  abstract findByCompanyId(
    companyId: string,
  ): Promise<CategoryAdditional[] | null>;

  abstract save(categoryAdditional: CategoryAdditional): Promise<void>;

  abstract delete(categoryAdditionalId: string): Promise<void>;
}
