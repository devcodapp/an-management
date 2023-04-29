import { Additional } from '@modules/additional/entities/additional';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  additionals: Additional[];
  options: string;
  inventory: {
    inStoCk?: boolean;
    amountInStock?: number;
    SKU?: string;
  };
  variants?: {
    type: string;
    options: {
      title: string;
      imageId: string;
      PriceDifference: number;
      SKU?: string;
      inventory: {
        inStoCk?: boolean;
        amountInStock?: number;
        SKU?: string;
      };
    }[];
  }[];
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

  public set images(images: ProductProps['images']) {
    this.props.images = images;
  }

  public get images(): ProductProps['images'] {
    return this.props.images;
  }
  // public set imageId(imageId: string) {
  //   this.props.imageId = imageId;
  // }

  // public get imageId(): string {
  //   return this.props.imageId;
  // }
  public set variants(variants: ProductProps['variants']) {
    this.props.variants = variants;
  }
  public get variants(): ProductProps['variants'] {
    return this.props.variants;
  }

  public set inventory(inventory: ProductProps['inventory']) {
    this.props.inventory = inventory;
  }
  public get inventory(): ProductProps['inventory'] {
    return this.props.inventory;
  }

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
