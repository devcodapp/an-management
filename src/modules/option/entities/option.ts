import { SubOption } from '@modules/suboption/entities/subOption';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseEntity, BaseEntityProps } from '@shared/entities/base-entity';

interface OptionProps {
  name: string;
  description: string;
  defaultPrice?: number;
  suboptions?: SubOption[];
  restaurantId: string;
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
  public set restaurantId(restaurantId: string) {
    this.props.restaurantId = restaurantId;
  }
  public get restaurantId(): string {
    return this.props.restaurantId;
  }

  public disable() {
    this.props.disabled = true;
    this.props.disabledAt = new Date();
  }

  public enable() {
    this.props.disabled = false;
    this.props.disabledAt = undefined;
  }

  public get suboptions(): SubOption[] | undefined {
    return this.props.suboptions;
  }

  public suboption(name: string): SubOption | undefined {
    return this.props.suboptions?.find(
      (item) => item.name.toUpperCase() === name.toUpperCase(),
    );
  }

  public addSubOption(subOption: SubOption): void {
    this.props.suboptions?.push(subOption);
  }

  public removeSubOption(name: string): void {
    const index = this.props.suboptions?.findIndex(
      (item) => item.name.toUpperCase() == name.toUpperCase(),
    );
    if (index == undefined || index < 0)
      throw new HttpException('SubOpção não encontrada', HttpStatus.NOT_FOUND);
    this.props.suboptions?.splice(index, 1);
  }

  public updateSubOption(oldName: string, subOption: SubOption) {
    const index = this.suboptions?.findIndex(
      (item) => item.name.toUpperCase() == oldName.toUpperCase(),
    );

    if (index == undefined || index < 0)
      throw new HttpException('SubOpção não encontrada', HttpStatus.NOT_FOUND);

    this.suboptions?.splice(index, 1, subOption);
  }
}
