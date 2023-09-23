interface AddressProps {
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
  district: string;
  complement?: string;
}

export class Address {
  public street: string;
  public number: string;
  public city: string;
  public state: string;
  public zip: string;
  public district: string;
  public complement?: string;

  constructor(props: AddressProps) {
    this.street = props.street?.toUpperCase();
    this.number = props.number;
    this.city = props.city?.toUpperCase();
    this.state = props.state?.toUpperCase();
    this.zip = props.zip;
    this.district = props.district?.toUpperCase();
    this.complement = props.complement?.toUpperCase();
  }
}