import { Product } from '../entities/product';
import { ProductFilterInput } from '../interfaces/product-filter.input';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;

  abstract product(productId: string): Promise<Product | null>;

  abstract products(filters: ProductFilterInput): Promise<Product[] | null>;

  abstract save(product: Product): Promise<void>;
}
