import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { Paginated } from 'src/utils/pagination';

export interface WorkerProps {
  name: string;
  imageId?: string;
  imageUrl?: string;
  disabled?: boolean
  userId: string;
  user?: User
}

interface User {
  username: string;
  email?: string;
  restaurantId?: string;
  roles?: Role[]
}

interface Role {
  id: string;
  name: string;
  description: string;
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

  public get user(): User | undefined {
    return this.props.user;
  }

  public set imageId(imageId: string | undefined) {
    this.props.imageId = imageId;
  }

  public get imageId(): string | undefined {
    return this.props.imageId;
  }

  public set imageUrl(imageUrl: string | undefined) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get disabled(): boolean | undefined {
    return this.props.disabled;
  }

  public disable(){
    this.props.disabled = true
  }

  public enable(){
    this.props.disabled = false
  }
}

export class WorkerPaginated extends Paginated<Worker>(){}
