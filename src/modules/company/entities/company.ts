import { randomUUID } from 'crypto';

interface CompanyProps {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
  imageId?: string;
  imageUrl?: string;
  createdAt?: Date;
  disableAt?: Date;
}

export class Company {
  private props: CompanyProps;

  constructor(props: CompanyProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get disableAt(): Date | undefined {
    return this.props.disableAt;
  }

  public set disableAt(disableAt: Date | undefined) {
    this.props.disableAt = disableAt;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get tags(): string[] {
    return this.props.tags;
  }

  public set tags(tags: string[]) {
    this.props.tags = tags;
  }

  public get type(): string {
    return this.props.type;
  }

  public set type(type: string) {
    this.props.type = type.toUpperCase();
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description.toUpperCase();
  }

  public get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  public set imageUrl(imageUrl: string | undefined) {
    this.props.imageUrl = imageUrl;
  }
  public get imageId(): string | undefined {
    return this.props.imageId;
  }

  public set imageId(imageId: string | undefined) {
    this.props.imageId = imageId;
  }
}
