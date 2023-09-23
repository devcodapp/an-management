/* eslint-disable @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator */
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

import { Address } from '../entities/address';
import { OpeningHours } from '../entities/openingHours';

export class SaveRestaurantBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  image?: Express.Multer.File;

  @IsOptional()
  banner?: Express.Multer.File;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsObject()
  address?: Address;

  @IsOptional()
  @IsArray()
  @Type(() => OpeningHours)
  openingHours?: OpeningHours[];
}
