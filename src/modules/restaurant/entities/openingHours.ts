export interface OpeningHoursProps {
  sunday?: DayProps;
  monday?: DayProps;
  tuesday?: DayProps;
  wednesday?: DayProps;
  thursday?: DayProps;
  friday?: DayProps;
  saturday?: DayProps;
}

interface DayProps {
  openAt: string | null;
  closeAt: string | null;
}

export class OpeningHours {
  private props: OpeningHoursProps;

  constructor(props: OpeningHoursProps) {
    this.props = {
      ...props,
    };
  }

  public get monday(): DayProps | undefined {
    return this.props.monday;
  }

  public set monday(monday: DayProps | undefined) {
    this.props.monday = monday;
  }

  public get sunday(): DayProps | undefined {
    return this.props.sunday;
  }

  public set sunday(sunday: DayProps | undefined) {
    this.props.sunday = sunday;
  }

  public get tuesday(): DayProps | undefined {
    return this.props.tuesday;
  }

  public set tuesday(tuesday: DayProps | undefined) {
    this.props.tuesday = tuesday;
  }

  public get thursday(): DayProps | undefined {
    return this.props.thursday;
  }

  public set thursday(thursday: DayProps | undefined) {
    this.props.thursday = thursday;
  }

  public get wednesday(): DayProps | undefined {
    return this.props.wednesday;
  }

  public set wednesday(wednesday: DayProps | undefined) {
    this.props.wednesday = wednesday;
  }

  public get friday(): DayProps | undefined {
    return this.props.friday;
  }

  public set friday(friday: DayProps | undefined) {
    this.props.friday = friday;
  }

  public get saturday(): DayProps | undefined {
    return this.props.saturday;
  }

  public set saturday(saturday: DayProps | undefined) {
    this.props.saturday = saturday;
  }
}
