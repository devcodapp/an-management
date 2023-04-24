import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';
import { SubOption } from './suboption';

interface OptionProps {
  name: string;
  description: string;
  suboptions?: SubOption[];
  companyId?: string;
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

  public set suboptions(suboptions: SubOption[] | undefined) {
    this.props.suboptions = suboptions;
  }

  public get suboptions(): SubOption[] | undefined {
    return this.props.suboptions;
  }
}
