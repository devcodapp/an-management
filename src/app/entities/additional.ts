import { Replace } from '@helpers/Replace';
import { BaseEntity } from './base-entity';
import { CategoryAdditional } from './category-additional';

export interface AdditionalProps {
  name: string;
  price: number;
  imageUrl: string;
  category: CategoryAdditional;
}

export class Additional extends BaseEntity {
  private props: AdditionalProps;

  constructor(
    props: Replace<AdditionalProps, { createAt?: Date }>,
    id?: string,
  ) {
    super({ id, createdAt: props.createAt });
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }
  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }
  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }
  public set category(category: CategoryAdditional) {
    this.props.category = category;
  }

  public get category(): CategoryAdditional {
    return this.props.category;
  }
}
