import { randomUUID } from 'node:crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  createdUser?: string;
  deletedAt?: Date;
  deletedUser?: string;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _createdUser?: string;
  private _deletedAt?: Date;
  private _deletedUser?: string;

  constructor(props: BaseEntityProps) {
    this._id = props.id ?? randomUUID();
    this._createdAt = props.createdAt ?? new Date();
    this._createdUser = props.createdUser;
    this._deletedAt = props.deletedAt;
    this._deletedUser = props.deletedUser;
  }

  public get id(): string {
    return this._id;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get createdUser(): string | undefined {
    return this._createdUser;
  }
  public get deletedAt(): Date | undefined {
    return this._deletedAt;
  }
  public get deletedUser(): string | undefined {
    return this._deletedUser;
  }
}
