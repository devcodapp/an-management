import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface TableProps {
  name: string;
  amountOfChairs: number;
  disabledAt?: Date;
  restaurantId: string;
}

export class Table extends BaseEntity {
  private props: TableProps;

  constructor(props: TableProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public disable() {
    this.props.disabledAt = new Date();
  }
  public enable() {
    this.props.disabledAt = undefined;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set amountOfChairs(amountOfChairs: number) {
    this.props.amountOfChairs = amountOfChairs;
  }

  public get amountOfChairs(): number {
    return this.props.amountOfChairs;
  }

  public set restaurantId(restaurantId: string) {
    this.props.restaurantId = restaurantId;
  }

  public get restaurantId(): string {
    return this.props.restaurantId;
  }

  public set disabledAt(disabledAt: Date | undefined) {
    this.props.disabledAt = disabledAt;
  }

  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }
}
