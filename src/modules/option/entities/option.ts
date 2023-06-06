import { SubOption } from '@modules/suboption/entities/subOption';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

interface OptionProps {
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions?: SubOption[];
  companyId: string;
  disabledAt?: Date;
  disabled?: boolean;
}

export class Option extends BaseEntity {
  private props: OptionProps;

  constructor(props: OptionProps, baseProps: BaseEntityProps) {
    super(baseProps);
    this.props = {
      ...props,
      suboptions: props.suboptions || [],
      disabled: props.disabled || false,
      name: props.name.toUpperCase(),
    };
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
  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }
  public get companyId(): string {
    return this.props.companyId;
  }

  public get suboptions(): SubOption[] | undefined {
    return this.props.suboptions;
  }

  public suboption(name: string): SubOption | undefined {
    return this.props.suboptions?.find(
      (item) => item.name.toUpperCase() === name.toUpperCase(),
    );
  }

  public set disabledAt(disabledAt: Date | undefined) {
    this.props.disabledAt = disabledAt;
  }

  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }

  public addSubOption(subOption: SubOption): void {
    this.props.suboptions?.push(subOption);
  }

  public removeSubOption(name: string): void {
    const index = this.props.suboptions?.findIndex(
      (item) => item.name.toUpperCase() == name.toUpperCase(),
    );
    if (index == undefined || index < 0) throw new Error('SubOption not found');
    this.props.suboptions?.splice(index, 1);
  }

  public updateSubOption(oldName: string, subOption: SubOption) {
    const index = this.suboptions?.findIndex(
      (item) => item.name.toUpperCase() == oldName.toUpperCase(),
    );

    if (index == undefined || index < 0) throw new Error('SubOption not found');

    this.suboptions?.splice(index, 1, subOption);
  }
}
