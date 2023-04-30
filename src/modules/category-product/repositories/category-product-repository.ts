import { CategoryProduct } from '../entities/category-product';
import { CategoryProductFilterInput } from '../interfaces/category-product-filter.input';

export abstract class CategoryProductsRepository {
  abstract create(categoryProduct: CategoryProduct): Promise<void>;

  abstract categoryProduct(
    categoryProductId: string,
  ): Promise<CategoryProduct | null>;

  abstract categoryProducts(
    filters: CategoryProductFilterInput,
  ): Promise<CategoryProduct[] | null>;

  abstract save(categoryProduct: CategoryProduct): Promise<void>;
}
