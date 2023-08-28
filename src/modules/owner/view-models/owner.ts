import { Owner } from "../entities/Owner";

export class OwnerViewModel {
  static toHTTP({
    id,
    name,
    userId,
    imageUrl,
  }: Owner): IOwnerView {
    return {
      id: id || '',
      name,
      userId,
      imageUrl: imageUrl || undefined,
    };
  }
}

export interface IOwnerView {
  id: string;
  name: string;
  userId: string;
  imageUrl?: string;
}
