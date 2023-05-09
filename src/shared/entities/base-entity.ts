import { randomUUID } from 'node:crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  createdWorker: string;
  deletedAt?: Date | null;
  deletedWorker?: string | null;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _createdWorker: string;
  private _deletedAt: Date | null;
  private _deletedWorker: string | null;

  constructor(props: BaseEntityProps) {
    this._id = props.id ?? randomUUID();
    this._createdAt = props.createdAt ?? new Date();
    this._createdWorker = props.createdWorker;
    this._deletedAt = props.deletedAt ?? null;
    this._deletedWorker = props.deletedWorker ?? null;
  }

  public get id(): string {
    return this._id;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public get createdWorker(): string {
    return this._createdWorker;
  }

  public set deletedAt(value: Date | null) {
    this._deletedAt = value;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public set deletedWorker(workerId: string | null) {
    this._deletedWorker = workerId;
  }

  public get deletedWorker(): string | null {
    return this._deletedWorker;
  }

  public delete(userId: string): void {
    this.deletedAt = new Date();
    this.deletedUser = userId;
  }
}
