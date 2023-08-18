import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { Order } from '@shared/entities/order';

export interface CategoryAdditionalProps {
  name: string;
  order: Order;
  restaurantId: string;
}

export class CategoryAdditional extends BaseEntity {
  private props: CategoryAdditionalProps;

  constructor(props: CategoryAdditionalProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = {
      ...props,
      name: props.name.toUpperCase(),
    };
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get name(): string {
    return this.props.name;
  }

  public set order(order: Order) {
    this.props.order = order;
  }

  public get order(): Order {
    return this.props.order;
  }

  public set restaurantId(restaurantId: string) {
    this.props.restaurantId = restaurantId;
  }

  public get restaurantId(): string {
    return this.props.restaurantId;
  }
}
