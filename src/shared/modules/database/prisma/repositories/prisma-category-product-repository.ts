import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryProductsRepository } from '@modules/category-product/repositories/category-product-repository';
import { CategoryProduct } from '@modules/category-product/entities/category-product';
import { PrismaCategoryProductMapper } from '../mappers/prisma-category-product-mapper';
import { CategoryProductFilterInput } from '@modules/category-product/interfaces/category-product-filter.input';

@Injectable()
export class PrismaCategoryProductRepository
  implements CategoryProductsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(categoryProduct: CategoryProduct): Promise<void> {
    const raw = PrismaCategoryProductMapper.toPrisma(categoryProduct);

    await this.prisma.categoryProduct.create({
      data: { ...raw },
    });
  }
  async categoryProduct(
    categoryProductId: string,
  ): Promise<CategoryProduct | null> {
    const categoryProduct = await this.prisma.categoryProduct.findUnique({
      where: { id: categoryProductId },
    });

    if (!categoryProduct) {
      return null;
    }

    return PrismaCategoryProductMapper.toDomain(categoryProduct);
  }

  async categoryProducts(
    filters: CategoryProductFilterInput,
  ): Promise<CategoryProduct[] | null> {
    const categoryProducts = await this.prisma.categoryProduct.findMany({
      where: {
        ...(filters ? filters : {}),
        ...(filters.name ? { name: { contains: filters.name } } : {}),
        deletedAt: null,
      },
      orderBy: { name: 'asc' },
    });
    return categoryProducts.map(PrismaCategoryProductMapper.toDomain);
  }

  async save(categoryProduct: CategoryProduct): Promise<void> {
    const { id, ...raw } =
      PrismaCategoryProductMapper.toPrisma(categoryProduct);
    await this.prisma.categoryProduct.update({
      data: { ...raw },
      where: { id },
    });
  }
}
