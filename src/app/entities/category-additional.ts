import { Replace } from '@helpers/Replace';
import { BaseEntity } from './base-entity';

export interface CategoryAdditionalProps {
  name: string;
  order: number;
}

export class CategoryAdditional extends BaseEntity {
  private props: CategoryAdditionalProps;

  constructor(
    props: Replace<CategoryAdditionalProps, { createdAt?: Date }>,
    id?: string,
  ) {
    super({ id, createdAt: props.createdAt });
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }
  public set order(order: number) {
    this.props.order = order;
  }

  public get order(): number {
    return this.props.order;
  }
}
