import { UserViewModel } from "@modules/user/view-models/user";

import { Owner } from "../entities/owner";

export class OwnerViewModel {
  static toHTTP({
    id,
    name,
    userId,
    imageUrl,
    user,
  }: Owner): IOwnerView {
    return {
      id: id || '',
      name,
      userId,
      imageUrl: imageUrl || undefined,
      user: user ? UserViewModel.toHTTP(user) : undefined
    };
  }
}

export interface IOwnerView {
  id: string;
  name: string;
  userId: string;
  imageUrl?: string;
  user?: UserViewModel;
}
