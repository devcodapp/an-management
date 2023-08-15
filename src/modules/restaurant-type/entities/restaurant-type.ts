import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

interface RestaurantTypeProps {
  name: string;
}

export class RestaurantType extends BaseEntity {
  private props: RestaurantTypeProps;

  constructor(props: RestaurantTypeProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = {
      ...props,
      name: props.name.toUpperCase(),
    };
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get name(): string {
    return this.props.name;
  }
}
