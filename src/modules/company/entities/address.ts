interface AddressProps {
  street: string;
  city: string;
  state: string;
  zip: string;
  district: string;
}

export class Address {
  private props: AddressProps;

  constructor(props: AddressProps) {
    this.props = {
      ...props,
      city: props.city.toUpperCase(),
      district: props.district.toUpperCase(),
      state: props.state.toUpperCase(),
      street: props.street.toUpperCase(),
    };
  }

  public get street(): string {
    return this.props.street;
  }

  public set street(street: string) {
    this.props.street = street.toUpperCase();
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city.toUpperCase();
  }

  public get state(): string {
    return this.props.state;
  }

  public set state(state: string) {
    this.props.state = state.toUpperCase();
  }

  public get zip(): string {
    return this.props.zip;
  }

  public set zip(zip: string) {
    this.props.zip = zip;
  }

  public get district(): string {
    return this.props.district;
  }

  public set district(district: string) {
    this.props.district = district.toUpperCase();
  }
}
