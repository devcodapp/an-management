import { randomUUID } from 'node:crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  createdUser: string;
  deletedAt?: Date | null;
  deletedUser?: string | null;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _createdUser: string;
  private _deletedAt: Date | null;
  private _deletedUser: string | null;

  constructor(props: BaseEntityProps) {
    this._id = props.id ?? randomUUID();
    this._createdAt = props.createdAt ?? new Date();
    this._createdUser = props.createdUser;
    this._deletedAt = props.deletedAt ?? null;
    this._deletedUser = props.deletedUser ?? null;
  }

  public get id(): string {
    return this._id;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get createdUser(): string {
    return this._createdUser;
  }

  public set deletedAt(value: Date | null) {
    this._deletedAt = value;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public set deletedUser(workerId: string | null) {
    this._deletedUser = workerId;
  }

  public get deletedUser(): string | null {
    return this._deletedUser;
  }

  public delete(userId: string): void {
    this.deletedAt = new Date();
    this.deletedUser = userId;
  }
}
