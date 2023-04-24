interface SubOptionProps {
  name: string;
  price: number;
  imageUrl: string;
  imageId: string;
}

export class SubOption {
  private props: SubOptionProps;

  constructor(props: SubOptionProps) {
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
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
  public set imageId(imageId: string) {
    this.props.imageId = imageId;
  }

  public get imageId(): string {
    return this.props.imageId;
  }
}
