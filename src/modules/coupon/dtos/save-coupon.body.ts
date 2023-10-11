import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveCouponBody {
  @IsNotEmpty()
  @IsUUID()
  couponId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  singleUse?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber({}, {message: 'Valor do desconto deve ser um número'})
  discountValue?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Porcentagem do desconto deve ser um número'})
  discountPercentage?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Limite de desconto deve ser um número'})
  discountLimit?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresIn?: Date;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;
}
