import { randomUUID } from 'crypto';
import { Address } from './address';

interface CompanyProps {
  id?: string;
  name: string;
  description: string;
  tags: string[];
  type: string;

  address?: Address;

  isOpened?: boolean;
  openAt?: string;
  closeAt?: string;

  imageId?: string;
  imageUrl?: string;

  createdAt?: Date;
  disabledAt?: Date;
}

export class Company {
  private props: CompanyProps;

  constructor(props: CompanyProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      isOpened: props.isOpened ?? false,
    };
  }

  public open() {
    this.props.isOpened = true;
  }

  public close() {
    this.props.isOpened = false;
  }

  public get id(): string {
    return this.props.id ?? randomUUID();
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }

  public set disabledAt(disabledAt: Date | undefined) {
    this.props.disabledAt = disabledAt;
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

  public get address(): Address | undefined {
    return this.props.address;
  }

  public set address(address: Address | undefined) {
    this.props.address = address;
  }

  public get openAt(): string | undefined {
    return this.props.openAt;
  }

  public set openAt(openAt: string | undefined) {
    this.props.openAt = openAt;
  }

  public get isOpened(): boolean | undefined {
    return this.props.isOpened;
  }

  public set isOpened(isOpened: boolean | undefined) {
    this.props.isOpened = isOpened;
  }

  public get closeAt(): string | undefined {
    return this.props.closeAt;
  }

  public set closeAt(closeAt: string | undefined) {
    this.props.closeAt = closeAt;
  }
}
