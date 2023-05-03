import { Additional } from '@modules/additional/entities/additional';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { ProductVariant } from './product-variant';
import { generateSKU } from '@shared/services/generateSKU';
import { CategoryProduct } from '@modules/category-product/entities/category-product';

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  sku?: string;
  variants?: ProductVariant[];
  images?: ProductImage[];
  categoryId: string;
  Additionals?: Additional[];
  Category?: CategoryProduct;
}

export interface ProductImage {
  imageUrl: string;
  imageId: string;
  order: number;
}

export class Product extends BaseEntity {
  private props: ProductProps;

  constructor(props: ProductProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = {
      ...props,
      sku: props.sku || generateSKU(5).toUpperCase(),
      name: props.name.toUpperCase(),
      images: props.images || [],
    };
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

  public get sku(): string | undefined {
    return this.props.sku;
  }

  public get images(): ProductImage[] | undefined {
    return this.props.images;
  }

  public get variants(): ProductVariant[] | undefined {
    return this.props.variants;
  }

  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  public set Additionals(additionals: Additional[] | undefined) {
    this.props.Additionals = additionals;
  }

  public get Additionals(): Additional[] | undefined {
    return this.props.Additionals;
  }

  public set Category(category: CategoryProduct | undefined) {
    this.props.Category = category;
  }

  public get Category(): CategoryProduct | undefined {
    return this.props.Category;
  }

  public image(order: number): ProductImage | undefined {
    return this.props.images?.find((item) => item.order === order);
  }

  public addImage(image: ProductImage): void {
    this.props.images?.push(image);
  }

  public removeImage(order: number): void {
    const index = this.props.images?.findIndex((item) => item.order === order);
    if (index == undefined || index < 0) throw new Error('Image not found');

    this.props.images?.splice(index, 1);
  }

  public variant(id: string) {
    return this.props.variants?.find((item) => item.id === id);
  }

  public addVariant(variant: ProductVariant): void {
    this.props.variants?.push(variant);
  }

  public removeVariant(id: string): void {
    const index = this.props.variants?.findIndex((item) => item.id == id);
    if (index == undefined || index < 0) throw new Error('Variant not found');
    this.props.variants?.splice(index, 1);
  }

  public updateVariant(id: string, variant: ProductVariant) {
    const index = this.variants?.findIndex((item) => item.id == id);

    if (index == undefined || index < 0) throw new Error('Variant not found');

    this.variants?.splice(index, 1, variant);
  }
}
