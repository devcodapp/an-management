import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@shared/modules/auth/auth.guard'
import { NumberInterceptor } from 'src/interceptors/number/number.interceptor'

import { CreateCouponBody } from './dtos/create-coupon.body'
import { FilterCouponBody } from './dtos/filter-coupon.body'
import { SaveCouponBody } from './dtos/save-coupon.body'
import { CreateCoupon } from './use-cases/create-coupon'
import { DeleteCoupon } from './use-cases/delete-coupon'
import { FilterCoupon } from './use-cases/filter-coupon'
import { GetCoupon } from './use-cases/get-coupon'
import { GetCouponCode } from './use-cases/get-coupon-code'
import { RecoverCoupon } from './use-cases/recover-coupon'
import { SaveCoupon } from './use-cases/save-coupon'
import { CouponViewModel, ICouponView } from './view-models/coupon'

@UseGuards(AuthGuard)
@UseInterceptors(NumberInterceptor)
@Controller('coupon')
export class CouponController {
  constructor(
    private createCoupon: CreateCoupon,
    private saveCoupon: SaveCoupon,
    private getCoupon: GetCoupon,
    private getCouponCode: GetCouponCode,
    private filterCoupon: FilterCoupon,
    private deleteCoupon: DeleteCoupon,
    private recoverCoupon: RecoverCoupon,
  ) {}

  @Get()
  async coupons(
    @Query() query: FilterCouponBody,
  ): Promise<{ coupons: ICouponView[] } | null> {
    const { coupons } = await this.filterCoupon.execute(query)

    if (!coupons) {
      return null
    }

    return {
      coupons: coupons.map(CouponViewModel.toHTTP),
    }
  }

  @Get(':id')
  async coupon(
    @Param('id') couponId: string,
  ): Promise<{ coupon: ICouponView } | null> {
    const { coupon } = await this.getCoupon.execute({
      couponId,
    })

    if (!coupon) {
      return null
    }

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }

  @Get('restaurant/:restaurantId/code/:code')
  async couponCode(
    @Param('code') code: string,
    @Param('restaurantId') restaurantId: string,
  ): Promise<{ coupon: ICouponView } | null> {
    const { coupon } = await this.getCouponCode.execute({
      code,
      restaurantId,
    })

    if (!coupon) {
      return null
    }

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }

  @Post()
  async create(
    @Body() body: CreateCouponBody,
  ): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.createCoupon.execute(body)
    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }

  @Put()
  async update(@Body() body: SaveCouponBody): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.saveCoupon.execute(body)

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }

  @Patch('delete/:couponId')
  async delete(
    @Param('couponId') couponId: string,
  ): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.deleteCoupon.execute({
      couponId,
    })

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }

  @Patch('recover/:couponId')
  async recover(
    @Param('couponId') couponId: string,
  ): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.recoverCoupon.execute({
      couponId,
    })

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    }
  }
}
