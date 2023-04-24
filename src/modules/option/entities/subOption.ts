import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
interface SubOptionProps {
  name: string;
  price?: number;
  imageUrl: string;
  imageId: string;
  desabledAt?: Date;
}

export class SubOption extends BaseEntity {
  private props: SubOptionProps;

  constructor(props: SubOptionProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get name(): string {
    return this.props.name;
  }

  public set price(price: number | undefined) {
    this.props.price = price;
  }

  public get price(): number | undefined {
    return this.props.price;
  }

  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }
  public set imageId(imageId: string) {
    this.props.imageId = imageId;
  }

  public get imageId(): string {
    return this.props.imageId;
  }
  public set desabledAt(desabledAt: Date | undefined) {
    this.props.desabledAt = desabledAt;
  }

  public get desabledAt(): Date | undefined {
    return this.props.desabledAt;
  }
}
