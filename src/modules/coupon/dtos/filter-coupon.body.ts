import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterCouponBody extends FilterBaseBody {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : false)
  singleUse?: boolean;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Valor do desconto deve ser um número' })
  @Transform(({ value }) => Number(value))
  discountValue?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Porcentagem do desconto deve ser um número' })
  @Transform(({ value }) => Number(value))
  discountPercentage?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Limite de desconto deve ser um número' })
  @Transform(({ value }) => Number(value))
  discountLimit?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresIn?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : false)
  expired?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  initiateIn?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : false)
  disabled?: boolean;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;
}
