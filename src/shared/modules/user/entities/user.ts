import { randomUUID } from 'crypto';

interface UserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  changePassword?: boolean;
  deletedAt?: Date;

  companyId: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
    };
  }

  public get id(): string | undefined {
    return this.props.id;
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

  public get companyId(): string {
    return this.props.companyId;
  }

  public set companyId(value: string) {
    this.props.companyId = value;
  }
}
