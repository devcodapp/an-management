import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { KafkaService } from '@shared/modules/kafka/kafka.service';

import { CouponController } from './coupon.controller';
import { CreateCoupon } from './use-cases/create-coupon';
import { DeleteCoupon } from './use-cases/delete-coupon';
import { DisableCoupon } from './use-cases/disable-coupon';
import { EnableCoupon } from './use-cases/enable-coupon';
import { FilterCoupon } from './use-cases/filter-coupon';
import { GetCoupon } from './use-cases/get-coupon';
import { GetCouponCode } from './use-cases/get-coupon-code';
import { PaginationCoupon } from './use-cases/pagination-coupon';
import { RecoverCoupon } from './use-cases/recover-coupon';
import { SaveCoupon } from './use-cases/save-coupon';

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
    RecoverCoupon,
    PaginationCoupon,
    DisableCoupon,
    EnableCoupon,
    KafkaService,
  ],
})
export class CouponModule {}
