export interface OpeningHoursProps {
  openDay: string;
  openHour: string;
  closeDay: string;
  closeHour: string;
}
export class OpeningHours {
  private props: OpeningHoursProps;

  constructor(props: OpeningHoursProps) {
    this.props = {
      ...props,
    };
  }

  public get openDay(): string {
    return this.props.openDay;
  }

  public set openDay(openDay: string) {
    this.props.openDay = openDay;
  }

  public get closeDay(): string {
    return this.props.closeDay;
  }

  public set closeDay(closeDay: string) {
    this.props.closeDay = closeDay;
  }

  public get openHour(): string {
    return this.props.openHour;
  }

  public set openHour(openHour: string) {
    this.props.openHour = openHour;
  }

  public get closeHour(): string {
    return this.props.closeHour;
  }

  public set closeHour(closeHour: string) {
    this.props.closeHour = closeHour;
  }

}
