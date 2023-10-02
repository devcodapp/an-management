import { randomUUID } from "crypto";

export interface DeliveryFeeProps {
  fee: number;
  distanceMin: number;
  distanceMax: number;
  disabled?: boolean;
  id?: string;
}

export class DeliveryFee {
  fee: number;
  distanceMin: number;
  distanceMax: number;
  disabled: boolean;
  public id: string;

  constructor(props: DeliveryFeeProps) {
    this.fee = props.fee;
    this.distanceMin = props.distanceMin;
    this.distanceMax = props.distanceMax;
    this.disabled = props.disabled || false;
    this.id = props.id || randomUUID()
  }

  disable(){
    this.disabled = false
  }

  enable(){
    this.disabled = true
  }
}