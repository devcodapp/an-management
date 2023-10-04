import { randomUUID } from "crypto";

export interface OpeningHoursProps {
  openDay: string;
  openHour: string;
  closeDay: string;
  closeHour: string;
  id?: string;
}

export class OpeningHours {
  public openDay: string;
  public openHour: string;
  public closeDay: string;
  public closeHour: string;
  public id: string;

  constructor(props: OpeningHoursProps) {
    this.openDay = props.openDay;
    this.openHour = props.openHour;
    this.closeDay = props.closeDay;
    this.closeHour = props.closeHour;
    this.id = props.id || randomUUID()
  }
}