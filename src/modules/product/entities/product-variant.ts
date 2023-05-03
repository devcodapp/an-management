import { randomUUID } from 'crypto';
import { ProductImage } from './product';

export interface ProductVariantProps {
  id?: string;
  type: VariantTypes;
  options?: VariantOptions[];
}

export type VariantTypes = 'color' | 'size' | 'material';

interface VariantOptions {
  title: string;
  images: ProductImage[];
  price: number;
  sku?: string;
  disabledAt?: Date;
}

export class ProductVariant {
  private props: ProductVariantProps;

  constructor(props: ProductVariantProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      options: props.options || [],
    };
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public set type(type: VariantTypes) {
    this.props.type = type;
  }

  public get type(): VariantTypes {
    return this.props.type;
  }

  public get options(): VariantOptions[] | undefined {
    return this.props.options;
  }

  public option(title: string): VariantOptions | undefined {
    return this.props.options?.find(
      (item) => item.title.toUpperCase() === title.toUpperCase(),
    );
  }

  public addOption(option: VariantOptions) {
    this.props.options?.push(option);
  }

  public removeOption(title: string) {
    const index = this.props.options?.findIndex(
      (item) => item.title.toUpperCase() === title.toUpperCase(),
    );
    if (index == undefined || index < 0) throw new Error('Option not found');
    this.props.options?.splice(index, 1);
  }

  public updateOption(oldTitle: string, option: VariantOptions) {
    const index = this.props.options?.findIndex(
      (item) => item.title.toUpperCase() === oldTitle.toUpperCase(),
    );

    if (index == undefined || index < 0) throw new Error('Option not found');

    this.props.options?.splice(index, 1, option);
  }

  public disableOption(title: string) {
    if (!this.props.options) throw new Error('Option not found');

    const index = this.props.options.findIndex(
      (item) => item.title.toUpperCase() === title.toUpperCase(),
    );

    if (index == undefined || index < 0) throw new Error('Option not found');

    this.props.options[index].disabledAt = new Date();
  }

  public enableOption(title: string) {
    if (!this.props.options) throw new Error('Option not found');

    const index = this.props.options.findIndex(
      (item) => item.title.toUpperCase() === title.toUpperCase(),
    );

    if (index == undefined || index < 0) throw new Error('Option not found');

    this.props.options[index].disabledAt = undefined;
  }
}
