import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface TableProps {
  name: string;
  amountOfChairs: number;
  isOccupied?: boolean;
  isReserved?: boolean;
  disabledAt?: Date;
  disabled?: boolean;
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
    this.props.disabled = true;
  }
  public enable() {
    this.props.disabledAt = undefined;
    this.props.disabled = false;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get disabled(): boolean  {
    return this.props.disabled || false;
  }

  public set isOccupied(isOccupied: boolean ) {
    this.props.isOccupied = isOccupied;
  }

  public get isOccupied(): boolean  {
    return this.props.isOccupied || false;
  }

  public set isReserved(isReserved: boolean ) {
    this.props.isReserved = isReserved;
  }

  public get isReserved(): boolean  {
    return this.props.isReserved || false;
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
