import { BaseEntity, BaseEntityProps } from '@app/entities/base-entity';
import { Order } from '@shared/entities/order';

export interface CategoryAdditionalProps {
  name: string;
  order: Order;
  companyId: string;
}

export class CategoryAdditional extends BaseEntity {
  private props: CategoryAdditionalProps;

  constructor(props: CategoryAdditionalProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
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

  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get companyId(): string {
    return this.props.companyId;
  }
}
