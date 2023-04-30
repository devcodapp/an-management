import { CategoryProduct } from '../entities/category-product';

export class CategoryProductViewModel {
  static toHTTP(categoryProduct: CategoryProduct): ICategoryProductView {
    return {
      id: categoryProduct.id,
      name: categoryProduct.name,
      description: categoryProduct.description,
      imageUrl: categoryProduct.imageUrl,
      order: categoryProduct.order.value,
      companyId: categoryProduct.companyId,
    };
  }
}

export interface ICategoryProductView {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
  companyId: string;
}
