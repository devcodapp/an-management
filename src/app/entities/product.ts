import { Replace } from '@helpers/Replace';
import { BaseEntity } from './base-entity';

export interface ProductProps {
  name: string;
  description: string;
  imagesUrl: string[];
  price: number;
}

export class Product extends BaseEntity {
  private props: ProductProps;
  constructor(props: Replace<ProductProps, { createdAt?: Date }>, id?: string) {
    super({ id, createdAt: props.createdAt });

    this.props = props;
  }
}
