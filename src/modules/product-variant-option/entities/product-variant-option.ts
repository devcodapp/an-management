import { ProductImage } from '@modules/product/entities/product';
import { generateSKU } from '@shared/services/generateSKU';

export interface OptionVariantProps {
  title: string;
  images?: ProductImage[];
  price?: number;
  sku?: string;
  disabledAt?: Date;
}

export class OptionVariant {
  private props: OptionVariantProps;

  constructor(props: OptionVariantProps) {
    this.props = {
      ...props,
      sku: props.sku || generateSKU(5),
      title: props.title.toUpperCase(),
    };
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title.toUpperCase();
  }

  public get sku(): string | undefined {
    return this.props.sku;
  }

  public set sku(sku: string | undefined) {
    this.props.sku = sku?.toUpperCase();
  }

  public get images(): ProductImage[] | undefined {
    return this.props.images;
  }

  public set images(images: ProductImage[] | undefined) {
    this.props.images = images;
  }

  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }

  public disable(): void {
    this.props.disabledAt = new Date();
  }

  public enable(): void {
    this.props.disabledAt = undefined;
  }
}
