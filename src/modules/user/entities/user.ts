import { randomUUID } from 'crypto';

interface UserProps {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  changePassword?: boolean;
  
  restaurantId?: string;
  deletedAt?: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
    this._id = props.id || randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public get username(): string {
    return this.props.username;
  }

  public set username(value: string) {
    this.props.username = value;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(value: string) {
    this.props.email = value;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(value: string) {
    this.props.password = value;
  }

  public get changePassword(): boolean | undefined {
    return this.props.changePassword;
  }

  public set changePassword(value: boolean | undefined) {
    this.props.changePassword = value;
  }

  public get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public set deletedAt(value: Date | undefined) {
    this.props.deletedAt = value;
  }

  public get restaurantId(): string | undefined {
    return this.props.restaurantId;
  }

  public set restaurantId(value: string | undefined) {
    this.props.restaurantId = value;
  }
}
