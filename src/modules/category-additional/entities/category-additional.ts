import { BaseEntity, BaseEntityProps } from '@app/entities/base-entity';
import { Replace } from '@helpers/Replace';

export interface CategoryAdditionalProps {
  name: string;
  order: number;
  companyId: string;
}

export class CategoryAdditional extends BaseEntity {
  private props: CategoryAdditionalProps;

  constructor(props: CategoryAdditionalProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
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

  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get companyId(): string {
    return this.props.companyId;
  }
}
