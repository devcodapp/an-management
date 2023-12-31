import slugify from '@shared/services/slugify';
import { randomUUID } from 'crypto';

import { Address } from './address';
import { DeliveryFee } from './deliveryFee';
import { OpeningHours } from './openingHours';

export interface RestaurantProps {
  id?: string;
  slug?: string
  name: string;
  description: string;
  tags?: string[];
  type: string;

  address?: Address;
  phoneNumber?: string;

  deliveryFees?: DeliveryFee[]

  isOpened?: boolean;
  openingHours?: OpeningHours[];

  imageId?: string;
  imageUrl?: string;
  bannerId?: string;
  bannerUrl?: string;

  ownerId: string;

  createdAt?: Date;
  disabledAt?: Date;
  disabled?: boolean;
}

export class Restaurant {
  private props: RestaurantProps;

  constructor(props: RestaurantProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      isOpened: props.isOpened ?? false,
      disabled: props.disabled ?? false,
      name: props.name.toUpperCase(),
      slug: props.slug ? props.slug : slugify(props.name)
    };
  }

  public open() {
    this.props.isOpened = true;
  }

  public close() {
    this.props.isOpened = false;
  }

  public get id(): string {
    return this.props.id ?? randomUUID();
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }

  public set disabledAt(disabledAt: Date | undefined) {
    this.props.disabledAt = disabledAt;
  }

  public get disabled(): boolean | undefined {
    return this.props.disabled;
  }
  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name.toUpperCase();
  }

  public get tags(): string[] | undefined {
    return this.props.tags;
  }

  public set tags(tags: string[] | undefined) {
    this.props.tags = tags;
  }

  public get type(): string {
    return this.props.type;
  }

  public set type(type: string) {
    this.props.type = type.toUpperCase();
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  public set imageUrl(imageUrl: string | undefined) {
    this.props.imageUrl = imageUrl;
  }

  public get imageId(): string | undefined {
    return this.props.imageId;
  }

  public set imageId(imageId: string | undefined) {
    this.props.imageId = imageId;
  }

  public get bannerUrl(): string | undefined {
    return this.props.bannerUrl;
  }

  public set bannerUrl(bannerUrl: string | undefined) {
    this.props.bannerUrl = bannerUrl;
  }

  public get bannerId(): string | undefined {
    return this.props.bannerId;
  }

  public set bannerId(bannerId: string | undefined) {
    this.props.bannerId = bannerId;
  }

  public get address(): Address | undefined {
    return this.props.address;
  }

  public set address(address: Address | undefined) {
    this.props.address = address;
  }

  public get phoneNumber(): string | undefined {
    return this.props.phoneNumber;
  }

  public set phoneNumber(phoneNumber: string | undefined) {
    this.props.phoneNumber = phoneNumber;
  }

  public get openingHours(): OpeningHours[] | undefined {
    return this.props.openingHours;
  }

  public set openingHours(openingHours: OpeningHours[] | undefined) {
    this.props.openingHours = openingHours;
  }

  public get deliveryFees(): DeliveryFee[] | undefined {
    return this.props.deliveryFees;
  }

  public set deliveryFees(deliveryFees: DeliveryFee[] | undefined) {
    this.props.deliveryFees = deliveryFees;
  }

  public get isOpened(): boolean | undefined {
    return this.props.isOpened;
  }

  public set isOpened(isOpened: boolean | undefined) {
    this.props.isOpened = isOpened;
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }

  public set ownerId(ownerId: string) {
    this.props.ownerId = ownerId;
  }

  public get slug(): string | undefined {
    return this.props.slug;
  }

  public set slug(slug: string | undefined ) {
    this.props.slug = slug;
  }

  public disable(){
    this.props.disabled = true;
    this.props.disabledAt = new Date();
  }
}
