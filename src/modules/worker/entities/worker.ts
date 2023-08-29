import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface WorkerProps {
  name: string;
  imageId?: string;
  imageUrl?: string;
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
}
