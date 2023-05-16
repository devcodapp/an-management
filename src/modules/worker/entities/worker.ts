import { BaseEntityProps } from '@shared/entities/base-entity';
import { BaseEntity } from '@shared/entities/base-entity';

export interface WorkerProps {
  name: string;
  role: any;
  imageId: string;
  imageUrl: string;
  userId: string;
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

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
