import { Replace } from '@helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface CategoryProps {
  name: string;
  order: number;
  imageUrl: string;
  createdAt: Date;
}

export class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }
  public set order(order: number) {
    this.props.order = order;
  }

  public get order(): number {
    return this.props.order;
  }
  public set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
