import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { SubOption } from './suboption';

interface OptionProps {
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions?: SubOption[];
  companyId?: string;
  disabledAt?: Date;
}

export class Option extends BaseEntity {
  private props: OptionProps;

  constructor(props: OptionProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }
  public get name(): string {
    return this.props.name;
  }

  public set description(description: string) {
    this.props.description = description.toUpperCase();
  }
  public get description(): string {
    return this.props.description;
  }

  public set defaultPrice(defaultPrice: number | undefined) {
    this.props.defaultPrice = defaultPrice;
  }
  public get defaultPrice(): number | undefined {
    return this.props.defaultPrice;
  }

  public set suboptions(suboptions: SubOption[] | undefined) {
    this.props.suboptions = suboptions;
  }
  public get suboptions(): SubOption[] | undefined {
    return this.props.suboptions;
  }

  public set disabledAt(disabledAt: Date | undefined) {
    this.props.disabledAt = disabledAt;
  }
  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }
}
