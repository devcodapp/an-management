import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

export interface TableProps {
  name: string;
  amountOfChairs: number;
  companyId: string;
}

export class Table extends BaseEntity {
  private props: TableProps;

  constructor(props: TableProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
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

  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get companyId(): string {
    return this.props.companyId;
  }
}
