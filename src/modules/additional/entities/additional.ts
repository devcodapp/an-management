import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface AdditionalProps {
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export class Additional extends BaseEntity {
  private props: AdditionalProps;

  constructor(props: AdditionalProps, baseProps: BaseEntityProps) {
    super(baseProps);
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
  public set category(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get category(): string {
    return this.props.categoryId;
  }
}
