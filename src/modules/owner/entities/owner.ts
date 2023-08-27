import { randomUUID } from "crypto";

interface OwnerProps {
  id?: string;
  name: string;
  userId: string;
  imageId?: string;
  imageUrl?: string;
  createdAt?: Date;
  deletedAt?: Date | null;
  deleted?: boolean;
}

export class Owner {
  private props: OwnerProps

  constructor(props: OwnerProps) {
    this.props = {
      ...props,
      deleted: props.deleted || false,
      createdAt: props.createdAt || new Date(),
      id: props.id || randomUUID()
    }
  }

  public get id(): string | undefined {
    return this.props.id
  }

  public get name(): string {
    return this.props.name
  }

  public get userId(): string {
    return this.props.userId
  }

  public get imageId(): string | undefined {
    return this.props.imageId
  }

  public get imageUrl(): string | undefined {
    return this.props.imageUrl
  }

  public set name(name: string) {
    this.props.name = name
  }

  public set imageId(imageId: string | undefined) {
    this.props.imageId = imageId
  }

  public set imageUrl(imageUrl: string | undefined) {
    this.props.imageUrl = imageUrl
  }

  public delete() {
    this.props.deleted = true;
    this.props.deletedAt = new Date()
  }

  public recover() {
    this.props.deleted = false;
    this.props.deletedAt = null;
  }
}