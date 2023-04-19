import { CategoryAdditional } from '@modules/category-additional/entities/category-additional';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface AdditionalProps {
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  Category?: CategoryAdditional;
}

export class Additional extends BaseEntity {
  private props: AdditionalProps;

  constructor(props: AdditionalProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
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
  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  public set Category(category: CategoryAdditional | undefined) {
    this.props.Category = category;
  }

  public get Category(): CategoryAdditional | undefined {
    return this.props.Category;
  }
}
