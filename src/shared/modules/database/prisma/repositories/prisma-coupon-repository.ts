import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Coupon } from '@modules/coupon/entities/coupon';
import { CouponFilterInput } from '@modules/coupon/interfaces/coupon-filter.input';
import { PrismaCouponMapper } from '../mappers/prisma-coupon-mapper';

@Injectable()
export class PrismaCouponRepository implements CouponsRepository {
  constructor(private prisma: PrismaService) {}

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

  async couponCode(code: string, companyId: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findFirst({
      where: { code, companyId },
    });

    if (!coupon) {
      return null;
    }

    return PrismaCouponMapper.toDomain(coupon);
  }

  async coupons(filters: CouponFilterInput): Promise<Coupon[] | null> {
    const coupons = await this.prisma.coupon.findMany({
      where: {
        ...(filters ? filters : {}),
        ...(filters.title ? { title: filters.title } : {}),
        ...(filters.description ? { description: filters.description } : {}),
        ...(filters.code ? { code: filters.code } : {}),
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
