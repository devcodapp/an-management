import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

interface CouponProps {
  title: string;
  description: string;
  code: string;
  discountValue?: number;
  discountPercentage?: number;
  discountLimit?: number;
  expiresIn: Date;

  companyId: string;
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

  public get companyId(): string {
    return this.props.companyId;
  }

  public set companyId(value: string) {
    this.props.companyId = value;
  }
}
