import { Owner } from '../entities/owner';

export abstract class OwnersRepository {
  abstract create(owner: Owner): Promise<void>;

  abstract owner(ownerId: string): Promise<Owner | null>;

  abstract ownerByUser(userId: string): Promise<Owner | null>;

  abstract save(owner: Owner): Promise<void>;
}
