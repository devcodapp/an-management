import { Role } from '@modules/role/entities/role';
import { randomUUID } from 'crypto';

interface UserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  changePassword?: boolean;
  
  deletedAt?: Date;

  roleIds?: string[]

  roles?: Role[]
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

  public get roleIds(): string[] | undefined {
    return this.props.roleIds;
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

}
