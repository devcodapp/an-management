import { OptionVariant } from '@modules/product-variant-option/entities/product-variant-option';
import { randomUUID } from 'crypto';

export interface ProductVariantProps {
  id?: string;
  type: VariantTypes;
  options?: OptionVariant[];
}

export type VariantTypes = 'color' | 'size' | 'material';

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

  public get options(): OptionVariant[] | undefined {
    return this.props.options;
  }

  public option(sku: string): OptionVariant | undefined {
    return this.props.options?.find(
      (item) => item.sku?.toUpperCase() === sku.toUpperCase(),
    );
  }

  public addOption(option: OptionVariant) {
    this.props.options?.push(option);
  }

  public removeOption(sku: string) {
    const index = this.props.options?.findIndex(
      (item) => item.sku?.toUpperCase() === sku.toUpperCase(),
    );
    if (index == undefined || index < 0) throw new Error('Option not found');
    this.props.options?.splice(index, 1);
  }

  public updateOption(sku: string, option: OptionVariant) {
    const index = this.props.options?.findIndex(
      (item) => item.sku?.toUpperCase() === sku.toUpperCase(),
    );

    if (index == undefined || index < 0) throw new Error('Option not found');

    this.props.options?.splice(index, 1, option);
  }
}
