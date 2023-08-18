import { OpeningHoursProps } from '../entities/openingHours';
import { Restaurant } from '../entities/restaurant';

export class RestaurantViewModel {
  static toHTTP({
    id,
    name,
    description,
    tags,
    type,
    address,
    isOpened,
    openingHours,
    imageUrl,
    disabledAt,
  }: Restaurant): IRestaurantView {
    return {
      id,
      name,
      description,
      tags: tags || [],
      type,
      address: {
        street: address?.street,
        city: address?.city,
        state: address?.state,
        zip: address?.zip,
        district: address?.district,
      },
      isOpened,
      openingHours,
      imageUrl,
      disabledAt,
    };
  }
}

export interface IRestaurantView {
  id: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
  address: IAddress;
  isOpened?: boolean;
  openingHours?: OpeningHoursProps;
  imageUrl?: string;
  disabledAt?: Date;
}

interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  district?: string;
}
