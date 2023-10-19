import { BaseEntity, BaseEntityProps } from './base-entity';

export interface BaseDisableEntityProps extends BaseEntityProps {
  disabled?: boolean
}

export class BaseDisableEntity extends BaseEntity {
  private _disabled: boolean;

  constructor(props: BaseDisableEntityProps) {
    super(props)
    this._disabled = props.disabled || false
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public disable(): void {
    this._disabled = true;
  }

  public enable(): void {
    this._disabled = false;
  }
}
