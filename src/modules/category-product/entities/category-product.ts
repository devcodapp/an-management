import { BaseEntityProps } from '@shared/entities/base-entity';
import { BaseEntity } from '@shared/entities/base-entity';
import { Order } from '@shared/entities/order';

export interface CategoryProductProps {
  name: string;
  description: string;
  order: Order;
  imageId: string;
  imageUrl: string;
  companyId: string;
}

export class CategoryProduct extends BaseEntity {
  private props: CategoryProductProps;

  constructor(props: CategoryProductProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get name(): string {
    return this.props.name;
  }
  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set order(order: Order) {
    this.props.order = order;
  }

  public get order(): Order {
    return this.props.order;
  }

  public set imageId(imageId: string) {
    this.props.imageId = imageId;
  }

  public get imageId(): string {
    return this.props.imageId;
  }
  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }
  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get companyId(): string {
    return this.props.companyId;
  }
}
