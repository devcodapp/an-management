import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { CreateCoupon } from './use-cases/create-coupon';
import { SaveCoupon } from './use-cases/save-coupon';
import { GetCoupon } from './use-cases/get-coupon';
import { GetCouponCode } from './use-cases/get-coupon-code';
import { FilterCoupon } from './use-cases/filter-coupon';
import { DeleteCoupon } from './use-cases/delete-coupon';

@Module({
  controllers: [CouponController],
  imports: [DatabaseModule],
  providers: [
    CreateCoupon,
    SaveCoupon,
    GetCoupon,
    GetCouponCode,
    FilterCoupon,
    DeleteCoupon,
  ],
})
export class CouponModule {}
