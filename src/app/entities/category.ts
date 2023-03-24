import { Replace } from '@helpers/Replace';
import { BaseEntity } from './base-entity';

export interface CategoryProps {
  name: string;
  order: number;
  imageUrl: string;
}

export class Category extends BaseEntity {
  private props: CategoryProps;

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date }>,
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
  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }
}
