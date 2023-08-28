import { Owner } from '../entities/Owner';

export abstract class OwnersRepository {
  abstract create(owner: Owner): Promise<void>;

  abstract owner(ownerId: string): Promise<Owner | null>;

  abstract save(owner: Owner): Promise<void>;
}
