import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCoupon } from './use-cases/create-coupon';
import { SaveCoupon } from './use-cases/save-coupon';
import { GetCoupon } from './use-cases/get-coupon';
import { GetCouponCode } from './use-cases/get-coupon-code';
import { FilterCoupon } from './use-cases/filter-coupon';
import { DeleteCoupon } from './use-cases/delete-coupon';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateCouponSwagger,
  DeleteCouponSwagger,
  FilterCouponSwagger,
  GetCouponSwagger,
  UpdateCouponSwagger,
} from './swagger/coupon.swagger';
import { FilterCouponBody } from './dtos/filter-coupon-body';
import { CouponViewModel, ICouponView } from './view-models/coupon';
import { CreateCouponBody } from './dtos/create-coupon-body';
import { SaveCouponBody } from './dtos/save-coupon-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(
    private createCoupon: CreateCoupon,
    private saveCoupon: SaveCoupon,
    private getCoupon: GetCoupon,
    private getCouponCode: GetCouponCode,
    private filterCoupon: FilterCoupon,
    private deleteCoupon: DeleteCoupon,
  ) {}

  @Get()
  @ApiOperation(FilterCouponSwagger)
  async coupons(
    @Query() query: FilterCouponBody,
  ): Promise<{ coupons: ICouponView[] } | null> {
    const { coupons } = await this.filterCoupon.execute(query);

    if (!coupons) {
      return null;
    }

    return {
      coupons: coupons.map(CouponViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiOperation(GetCouponSwagger)
  async coupon(
    @Param('id') couponId: string,
  ): Promise<{ coupon: ICouponView } | null> {
    const { coupon } = await this.getCoupon.execute({
      couponId,
    });

    if (!coupon) {
      return null;
    }

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    };
  }

  @Get('company/:companyId/code/:code')
  @ApiOperation(GetCouponSwagger)
  async couponCode(
    @Param('code') code: string,
    @Param('companyId') companyId: string,
  ): Promise<{ coupon: ICouponView } | null> {
    const { coupon } = await this.getCouponCode.execute({
      code,
      companyId,
    });

    if (!coupon) {
      return null;
    }

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    };
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(CreateCouponSwagger)
  @ApiBody({ type: CreateCouponBody })
  async create(
    @Body() body: CreateCouponBody,
  ): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.createCoupon.execute(body);
    return {
      coupon: CouponViewModel.toHTTP(coupon),
    };
  }

  @Put()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: SaveCouponBody })
  @ApiOperation(UpdateCouponSwagger)
  async update(@Body() body: SaveCouponBody): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.saveCoupon.execute(body);

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    };
  }

  @Patch(':couponId')
  @ApiOperation(DeleteCouponSwagger)
  async delete(
    @Param('couponId') couponId: string,
  ): Promise<{ coupon: ICouponView }> {
    const { coupon } = await this.deleteCoupon.execute({
      couponId,
    });

    return {
      coupon: CouponViewModel.toHTTP(coupon),
    };
  }
}
