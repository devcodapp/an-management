import { FilterCouponBody } from '@modules/coupon/dtos/filter-coupon.body';
import { Coupon } from '@modules/coupon/entities/coupon';
import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { Injectable } from '@nestjs/common';

import { PrismaCouponMapper } from '../mappers/prisma-coupon-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaCouponRepository implements CouponsRepository {
  constructor(private prisma: PrismaService) { }

  async create(coupon: Coupon): Promise<void> {
    const raw = PrismaCouponMapper.toPrisma(coupon);

    await this.prisma.coupon.create({ data: raw });
  }

  async coupon(couponId: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!coupon) {
      return null;
    }

    return PrismaCouponMapper.toDomain(coupon);
  }

  async couponCode(code: string, restaurantId: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findFirst({
      where: { code, restaurantId },
    });

    if (!coupon) {
      return null;
    }

    return PrismaCouponMapper.toDomain(coupon);
  }

  async coupons({
    deleted,
    ...filters
  }: FilterCouponBody): Promise<Coupon[] | null> {
    const coupons = await this.prisma.coupon.findMany({
      where: {
        ...(filters.title && { title: { contains: filters.title, mode: 'insensitive' } }),
        ...(filters.description && { description: { contains: filters.description, mode: 'insensitive' } }),
        ...(filters.code && { code: { contains: filters.code, mode: 'insensitive' } }),
        ...(filters.restaurantId && { restaurantId: filters.restaurantId }),
        ...(filters.discountLimit && { discountLimit: filters.discountLimit }),
        ...(filters.discountPercentage && { discountPercentage: filters.discountPercentage }),
        ...(filters.discountValue && { discountValue: filters.discountValue }),
        ...(filters.expiresIn && {
          expiresIn: {
            lte: new Date(filters.expiresIn),
            gte: new Date(
              filters.expiresIn.getTime() +
              (1000 * 3600 * 24 - 1)
            )
          }
        }),
        deleted: deleted || false,
      },
    });

    return coupons.map(PrismaCouponMapper.toDomain);
  }

  async save(coupon: Coupon): Promise<void> {
    const { id, ...raw } = PrismaCouponMapper.toPrisma(coupon);

    await this.prisma.coupon.update({
      where: { id },
      data: raw,
    });
  }
}
