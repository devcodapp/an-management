import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCouponBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber({}, {message: 'Valor do desconto deve ser um número'})
  discountValue?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Porcentagem do desconto deve ser um número'})
  discountPercentage?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Limite de desconto deve ser um número'})
  discountLimit?: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expiresIn: Date;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
