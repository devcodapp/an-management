import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@modules/product/entities/product';
import { ProductsRepository } from '@modules/product/repositories/product-repository';
import { ProductFilterInput } from '@modules/product/interfaces/prodcut-filter.input';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}
  async product(productId: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }
  products(filters: ProductFilterInput): Promise<Product[] | null> {
    throw new Error('Method not implemented.');
  }
  async save(product: Product): Promise<void> {
    const { id, ...raw } = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      data: { ...raw },
      where: { id },
    });
  }

  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.create({
      data: { ...raw },
    });
  }
}
