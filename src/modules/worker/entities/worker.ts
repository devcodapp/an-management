import { BaseEntityProps } from '@shared/entities/base-entity';
import { BaseEntity } from '@shared/entities/base-entity';

export interface WorkerProps {
  name: string;
  email: string;
  password: string;
  role: any;
  imageId: string;
  imageUrl: string;
  companyId: string;
}

export class Worker extends BaseEntity {
  private props: WorkerProps;

  constructor(props: WorkerProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = {
      ...props,
      name: props.name.toUpperCase(),
    };
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set role(role: 'admin' | 'colaborator') {
    if (role === 'admin') {
      this.props.role = 'admin';
      return;
    }
    this.props.role = 'colaborator';
  }

  public get role(): 'admin' | 'colaborator' {
    return this.props.role;
  }

  public set imageId(imageId: string) {
    this.props.imageId = imageId;
  }

  public get imageId(): string {
    return this.props.imageId;
  }

  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }

  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get companyId(): string {
    return this.props.companyId;
  }
}