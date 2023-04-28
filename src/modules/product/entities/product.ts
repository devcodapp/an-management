import { Additional } from '@modules/additional/entities/additional';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  additionals: Additional[];
  options: string;
  images: {
    imageUrl: string;
    imageId: string;
  }[];
  categoryId: string;
  category?: string;
}

export class Product extends BaseEntity {
  private props: ProductProps;

  constructor(props: ProductProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name;
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

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  // public set imageUrl(imageUrl: string) {
  //   this.props.imageUrl = imageUrl;
  // }

  // public get imageUrl(): string {
  //   return this.props.imageUrl;
  // }
  // public set imageId(imageId: string) {
  //   this.props.imageId = imageId;
  // }

  // public get imageId(): string {
  //   return this.props.imageId;
  // }
  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  // public set Category(category: CategoryAdditional | undefined) {
  //   this.props.Category = category;
  // }

  // public get Category(): CategoryAdditional | undefined {
  //   return this.props.Category;
  // }
}
