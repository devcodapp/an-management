import { OpeningHours } from '../entities/openingHours';
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
    bannerUrl,
    disabledAt,
    slug,
    phoneNumber,
    ownerId,
    disabled
  }: Restaurant): IRestaurantView {
    return {
      id,
      name,
      description,
      tags: tags || [],
      type,
      slug: slug!,
      address: {
        street: address?.street,
        number: address?.number,
        city: address?.city,
        state: address?.state,
        zip: address?.zip,
        district: address?.district,
        complement: address?.complement
      },
      isOpened,
      openingHours,
      image: imageUrl,
      banner: bannerUrl,
      phoneNumber,
      ownerId,
      disabled: disabled || false
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
  openingHours?: OpeningHours[];
  image?: string;
  banner?: string;
  disabled: boolean;
  ownerId: string;
  phoneNumber?: string;
  slug: string
}

interface IAddress {
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zip?: string;
  district?: string;
  complement?: string
}
