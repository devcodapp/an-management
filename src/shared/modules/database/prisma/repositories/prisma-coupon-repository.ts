import { FilterCouponBody } from '@modules/coupon/dtos/filter-coupon.body';
import { Coupon, CouponPaginated } from '@modules/coupon/entities/coupon';
import { CouponsRepository } from '@modules/coupon/repositories/coupon-repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationProps } from '@shared/dtos/pagination-body';
import { Paginate } from 'src/utils/pagination';

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

  async coupons(filters: FilterCouponBody): Promise<Coupon[] | null> {
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
        ...(filters.initiateIn && {
          initiateIn: {
            lte: new Date(filters.initiateIn),
            gte: new Date(
              filters.initiateIn.getTime() +
              (1000 * 3600 * 24 - 1)
            )
          }
        }),
        ...(filters.disabled !== undefined && { disabled: filters.disabled }),
        deleted: filters.deleted || false,
      },
    });

    return coupons.map(PrismaCouponMapper.toDomain);
  }

  async couponsPagination(
    filters: FilterCouponBody,
    { currentPage, orderKey, orderValue, perPage }: PaginationProps
  ): Promise<CouponPaginated> {
    const query: Prisma.CouponFindManyArgs = {
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
        ...(filters.initiateIn && {
          initiateIn: {
            lte: new Date(filters.initiateIn),
            gte: new Date(
              filters.initiateIn.getTime() +
              (1000 * 3600 * 24 - 1)
            )
          }
        }),
        ...(filters.disabled !== undefined && { disabled: filters.disabled }),
        deleted: filters.deleted || false,
      },
    }

    const [items, count] = await this.prisma.$transaction([
      this.prisma.coupon.findMany({
        where: query.where,
        orderBy: { [orderKey]: orderValue },
        skip: perPage * (currentPage - 1),
        take: perPage
      }),
      this.prisma.coupon.count({ where: query.where })
    ])

    const pagination = await Paginate(count, perPage, currentPage)

    return {
      items: items.map(PrismaCouponMapper.toDomain),
      pagination
    }
  }

  async save(coupon: Coupon): Promise<void> {
    const { id, ...raw } = PrismaCouponMapper.toPrisma(coupon);

    await this.prisma.coupon.update({
      where: { id },
      data: raw,
    });
  }
}
