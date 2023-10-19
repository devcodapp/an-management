import { randomUUID } from 'node:crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  createdUser: string;
  deletedAt?: Date | null;
  deletedUser?: string | null;
  deleted?: boolean;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _createdUser: string;
  private _deletedAt: Date | null;
  private _deletedUser: string | null;
  private _deleted: boolean;

  constructor(props: BaseEntityProps) {
    this._id = props.id ?? randomUUID();
    this._createdAt = props.createdAt ?? new Date();
    this._createdUser = props.createdUser;
    this._deletedAt = props.deletedAt ?? null;
    this._deletedUser = props.deletedUser ?? null;
    this._deleted = props.deleted ?? false;
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

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public get deletedUser(): string | null {
    return this._deletedUser;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  public delete(userId: string): void {
    this._deletedAt = new Date();
    this._deletedUser = userId;
    this._deleted = true;
  }

  public recover(): void {
    this._deleted = false;
  }
}
