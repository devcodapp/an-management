import { BaseDisableEntity, BaseDisableEntityProps } from '@shared/entities/base-disable-entity';
import { Paginated } from 'src/utils/pagination';

interface CouponProps {
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;

  initiateIn?: Date
  expiresIn?: Date;
  singleUse: boolean;

  restaurantId: string;
}

export class Coupon extends BaseDisableEntity {
  private props: CouponProps;

  constructor(props: CouponProps, baseProps: BaseDisableEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(value: string) {
    this.props.title = value;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get code(): string {
    return this.props.code;
  }

  public set code(value: string) {
    this.props.code = value;
  }

  public get singleUse(): boolean {
    return this.props.singleUse;
  }

  public set singleUse(value: boolean) {
    this.props.singleUse = value;
  }

  public get discountPercentage(): number | undefined {
    return this.props.discountPercentage;
  }

  public set discountPercentage(value: number | undefined) {
    this.props.discountPercentage = value;
  }
  public get discountValue(): number | undefined {
    return this.props.discountValue;
  }

  public set discountValue(value: number | undefined) {
    this.props.discountValue = value;
  }

  public get discountLimit(): number | undefined {
    return this.props.discountLimit;
  }

  public set discountLimit(value: number | undefined) {
    this.props.discountLimit = value;
  }

  public get expiresIn(): Date | undefined {
    return this.props.expiresIn;
  }

  public get initiateIn(): Date | undefined {
    return this.props.initiateIn;
  }

  public set expiresIn(value: Date | undefined) {
    this.props.expiresIn = value;
  }

  public set initiateIn(value: Date | undefined) {
    this.props.initiateIn = value;
  }

  public get restaurantId(): string {
    return this.props.restaurantId;
  }

  public set restaurantId(value: string) {
    this.props.restaurantId = value;
  }
}

export class CouponPaginated extends Paginated<Coupon>(){}