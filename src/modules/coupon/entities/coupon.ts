import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { Paginated } from 'src/utils/pagination';

interface CouponProps {
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn: Date;
  singleUse: boolean;

  restaurantId: string;
}

export class Coupon extends BaseEntity {
  private props: CouponProps;

  constructor(props: CouponProps, baseProps: BaseEntityProps) {
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

  public get expiresIn(): Date {
    return this.props.expiresIn;
  }

  public set expiresIn(value: Date) {
    this.props.expiresIn = value;
  }

  public get restaurantId(): string {
    return this.props.restaurantId;
  }

  public set restaurantId(value: string) {
    this.props.restaurantId = value;
  }
}

export class CouponPaginated extends Paginated<Coupon>(){}